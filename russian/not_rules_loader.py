# Copyright (c) 2019 Kirill Gashkov
#
# Distributed under MIT License. See LICENSE file for details.

import json

import gspread
from oauth2client.service_account import ServiceAccountCredentials


CREDS_GSPREAD = 'credentials/gspread.json'
SDS_NAME = 'Правила по русскому языку'
WKS_NAME = 'Иерархия'

ROW_I_RULES_HEAD = 0
ROW_I_RULES_TAIL = 9
ROW_I_TASKS_HEAD = 10
ROW_I_TASKS_TAIL = 14

COL_I_RULES_HEAD = 0
COL_I_RULES_TAIL = 23


def main():
    table = get_rules_table()

    rule_tree = extract_value(
        table,
        row_i=ROW_I_RULES_HEAD,
        col_i_head=COL_I_RULES_HEAD,
        col_i_tail=COL_I_RULES_TAIL,
    )

    with open('../src/assets/not_rules_tree.json', '+w') as f:
        json.dump(rule_tree, f, ensure_ascii=False)


def extract_value(table, row_i, col_i_head, col_i_tail):
    row_i_value = row_i + 1

    values_count = 0
    col_i = col_i_head
    while col_i <= col_i_tail:
        if table[row_i_value][col_i]:
            values_count += 1
        col_i += 1

    if values_count == 0 or ROW_I_RULES_TAIL == row_i:
        return _extract_spelling_and_tasks(table, row_i, col_i_head, col_i_tail)
    elif values_count == 2:
        return _extract_if(table, row_i, col_i_head, col_i_tail)
    elif values_count > 2:
        return _extract_switch(table, row_i, col_i_head, col_i_tail)
    return None


def _extract_spelling_and_tasks(table, row_i, col_i_head, col_i_tail):
    row_i_spelling = row_i
    col_i = col_i_head

    spelling = table[row_i_spelling][col_i]
    tasks = list()
    for row_i_task in range(ROW_I_TASKS_HEAD, ROW_I_TASKS_TAIL + 1):
        task = table[row_i_task][col_i]
        if task:
            tasks.append(task)

    return {
        'spelling': spelling,
        'tasks': tasks,
    }


def _extract_if(table, row_i, col_i_head, col_i_tail):
    row_i_title = row_i
    row_i_value = row_i + 1

    col_i_title = col_i_head
    col_i_true_value_head = col_i_head
    col_i_false_value_head = col_i_head + 1
    while not table[row_i_value][col_i_false_value_head]:
        col_i_false_value_head += 1
    col_i_true_value_tail = col_i_false_value_head - 1
    col_i_false_value_tail = col_i_tail

    title = table[row_i_title][col_i_title]
    true_value = extract_value(
        table,
        row_i_value,
        col_i_true_value_head,
        col_i_true_value_tail,
    )
    false_value = extract_value(
        table,
        row_i_value,
        col_i_false_value_head,
        col_i_false_value_tail,
    )

    return {
        'if': title,
        'true': true_value,
        'false': false_value,
    }


def _extract_switch(table, row_i, col_i_head, col_i_tail):
    row_i_title = row_i
    row_i_case = row_i + 1
    row_i_value = row_i + 2

    col_i_title = col_i_head
    col_is_cases = list()
    _col_i_case = col_i_head
    while _col_i_case <= col_i_tail:
        if table[row_i_case][_col_i_case]:
            col_is_cases.append(_col_i_case)
        _col_i_case += 1
    col_is_cases.append(col_i_tail + 1)

    title = table[row_i_title][col_i_title]
    cases = dict()
    for j in range(len(col_is_cases) - 1):
        col_i_case_head = col_is_cases[j]
        col_i_case_tail = col_is_cases[j + 1] - 1

        case = table[row_i_case][col_i_case_head]
        cases[case] = extract_value(
            table,
            row_i_value,
            col_i_case_head,
            col_i_case_tail,
        )

    return {
        'switch': title,
        'cases': cases,
    }


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
