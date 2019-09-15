# Copyright (c) 2019 Kirill Gashkov
#
# Distributed under MIT License. See LICENSE file for details.

import json

import gspread
from oauth2client.service_account import ServiceAccountCredentials


CREDS_GSPREAD = 'credentials/gspread.json'
SDS_NAME = 'Правила по русскому языку'
WKS_NAME = 'Иерархия'

ROW_I_RULES_COMMON_HEAD = 0
ROW_I_RULES_COMMON_TAIL = 3
ROW_I_POS_CASES = 4
ROW_I_RULES_POS_HEAD = 5
ROW_I_RULES_POS_TAIL = 9
ROW_I_TASKS_HEAD = 10
ROW_I_TASKS_TAIL = 14

COL_I_RULES_COMMON_HEAD = 0
COL_I_RULES_COMMON_TAIL = 2
COL_I_RULES_POS_HEAD = 3
COL_I_RULES_POS_TAIL = 23


def main():
    table = get_rules_table()

    deadlock_rules = list()
    deadlock_tasks = list()
    deadlock_rule_chains = list()

    rules, tasks, chains = load_common_rules(table)
    deadlock_rules += rules
    deadlock_tasks += tasks
    deadlock_rule_chains += chains

    rules, tasks, chains = load_pos_rules(table)
    deadlock_rules += rules
    deadlock_tasks += tasks
    deadlock_rule_chains += chains

    with open('../src/assets/not_deadlock_rules.json', '+w') as f:
        json.dump(deadlock_rules, f, ensure_ascii=False, indent=4)
    with open('../src/assets/not_deadlock_tasks.json', '+w') as f:
        json.dump(deadlock_tasks, f, ensure_ascii=False, indent=4)
    with open('../src/assets/not_deadlock_rule_chains.json', '+w') as f:
        json.dump(deadlock_rule_chains, f, ensure_ascii=False, indent=4)


def load_common_rules(table):
    deadlock_rules = list()
    deadlock_tasks = list()
    deadlock_rule_chains = list()

    for col_i in range(COL_I_RULES_COMMON_HEAD, COL_I_RULES_COMMON_TAIL + 1):
        rule = get_deadlock_rule(
            table,
            ROW_I_RULES_COMMON_HEAD,
            ROW_I_RULES_COMMON_TAIL,
            col_i,
            pos=None
        )
        tasks = get_deadlock_tasks(table, col_i)
        rule_chain = list(
            range(COL_I_RULES_COMMON_HEAD, col_i + 1)
        )

        deadlock_rules.append(rule)
        deadlock_tasks.append(tasks)
        deadlock_rule_chains.append(rule_chain)

    return deadlock_rules, deadlock_tasks, deadlock_rule_chains


def load_pos_rules(table):
    deadlock_rules = list()
    deadlock_tasks = list()
    deadlock_rule_chains = list()

    pos_list = get_pos_list(table)
    col_i_headtails_pos = get_col_i_headtails_pos(table)

    for (pos, (col_i_head, col_i_tail)) in zip(pos_list, col_i_headtails_pos):
        for col_i in range(col_i_head, col_i_tail + 1):
            rule = get_deadlock_rule(
                table,
                ROW_I_RULES_POS_HEAD,
                ROW_I_RULES_POS_TAIL,
                col_i,
                pos=pos
            )
            tasks = get_deadlock_tasks(table, col_i)
            rule_chain = list(
                range(COL_I_RULES_COMMON_HEAD, COL_I_RULES_COMMON_TAIL + 1)
            ) + list(
                range(col_i_head, col_i + 1)
            )

            deadlock_rules.append(rule)
            deadlock_tasks.append(tasks)
            deadlock_rule_chains.append(rule_chain)

    return deadlock_rules, deadlock_tasks, deadlock_rule_chains


def get_pos_list(table):
    pos_list = list()

    for col_i in range(COL_I_RULES_POS_HEAD, COL_I_RULES_POS_TAIL + 1):
        cell = table[ROW_I_POS_CASES][col_i]
        if not cell:
            continue

        pos_list.append(cell)

    return pos_list


def get_col_i_headtails_pos(table):
    col_i_headtails_pos = list()
    range_start = COL_I_RULES_POS_HEAD

    for col_i in range(COL_I_RULES_POS_HEAD + 1, COL_I_RULES_POS_TAIL + 1):
        cell = table[ROW_I_POS_CASES][col_i]
        if not cell:
            continue

        col_i_headtails_pos.append((range_start, col_i - 1))
        range_start = col_i
    col_i_headtails_pos.append((range_start, COL_I_RULES_POS_TAIL))

    return col_i_headtails_pos


def get_deadlock_rule(table, row_i_head, row_i_tail, col_i, pos):
    cell_1 = None
    cell_2 = None

    for row_i in range(row_i_head, row_i_tail + 1):
        cell = table[row_i][col_i]
        if not cell:
            continue

        if not cell_1:
            cell_1 = cell
        elif not cell_2:
            cell_2 = cell
            break

    if cell_2:
        rule = cell_1
        spelling = cell_2
    else:
        rule = None
        spelling = cell_1

    return {
        'pos': pos,
        'rule': rule,
        'spelling': spelling,
    }


def get_deadlock_tasks(table, col_i):
    tasks = list()

    for row_i in range(ROW_I_TASKS_HEAD, ROW_I_TASKS_TAIL + 1):
        cell = table[row_i][col_i]
        if cell:
            tasks.append(cell)

    return tasks


#
# Google Sheets
#


def login_gspread():
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        CREDS_GSPREAD,
        ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
    )
    return gspread.authorize(creds)


def get_rules_worksheet():
    gclient = login_gspread()
    return gclient.open(SDS_NAME).worksheet(WKS_NAME)


def get_rules_table():
    wks = get_rules_worksheet()
    return wks.get_all_values()


if __name__ == '__main__':
    main()
