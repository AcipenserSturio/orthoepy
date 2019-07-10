import random
import json

import gspread
from oauth2client.service_account import ServiceAccountCredentials


CREDS_GSPREAD = 'credentials/gspread.json'
SDS_NAME = 'Правила по русскому языку'
WKS_NAME = 'НЕ слитно или раздельно'


def main():
    id_generator = IDGenerator()

    rules = dict()
    rules_as_tasks = dict()
    tasks = dict()

    rule_cols = get_rule_cols()
    for subcol_1, subcol_2 in rule_cols:
        rule_id = id_generator.new_id()
        task_ids = list()
        exception_task_ids = list()

        rule_wording_if = subcol_1[0]
        rule_wording_then = subcol_1[1]
        rule_as_task_wording = subcol_1[0]
        rule_as_task_correct = subcol_1[1]
        normal_task_wordings = subcol_1[3:]
        exception_task_wordings = subcol_2[3:]

        rule_as_task_id = id_generator.new_id()
        rule_as_task = make_rule_as_task(
            rule_as_task_wording,
            rule_as_task_correct
        )
        rules_as_tasks[rule_as_task_id] = rule_as_task

        for task_wording in normal_task_wordings:
            if task_wording == '':
                continue
            task_id = id_generator.new_id()
            task = make_normal_task(
                task_wording,
                rule_as_task_correct,
                rule_id
            )
            tasks[task_id] = task
            task_ids.append(task_id)

        for task_wording in exception_task_wordings:
            if task_wording == '':
                continue
            task_id = id_generator.new_id()
            task = make_exception_task(
                task_wording,
                rule_as_task_correct,
                rule_id
            )
            tasks[task_id] = task
            exception_task_ids.append(task_id)

        rule_wording = f'{rule_wording_if} - {rule_wording_then.lower()}.'
        rule = make_rule(
            rule_wording,
            rule_as_task_id,
            task_ids,
            exception_task_ids
        )
        rules[rule_id] = rule

    with open('../src/assets/not_rules.json', 'w+') as f:
        json.dump(rules, f, indent=4, ensure_ascii=False)

    with open('../src/assets/not_rules_as_tasks.json', 'w+') as f:
        json.dump(rules_as_tasks, f, indent=4, ensure_ascii=False)

    with open('../src/assets/not_tasks.json', 'w+') as f:
        json.dump(tasks, f, indent=4, ensure_ascii=False)


#
# JSON Object Makers
#


def _make_task(wording, input_elements, correct):
    return {
        'wording': wording,
        'input': {
            'type': 'options',
            'elements': input_elements,
        },
        'correct': correct,
        'explanation': dict(),
    }


def make_rule_as_task(wording, correct):
    task = _make_task(
        wording=wording,
        input_elements=['Слитно', 'Раздельно', 'Не знаю'],
        correct=correct
    )
    return task


def make_normal_task(wording, correct, rule_id):
    task = _make_task(
        wording=wording,
        input_elements=['Слитно', 'Раздельно'],
        correct=correct
    )
    task['explanation'].update({
        'rule': {
            'id': rule_id,
            'is_exception': False
        }
    })
    return task


def make_exception_task(wording, correct, rule_id):
    task = _make_task(
        wording=wording,
        input_elements=['Слитно', 'Раздельно'],
        correct=correct
    )
    task['explanation'].update({
        'rule': {
            'id': rule_id,
            'is_exception': True
        }
    })
    return task


def make_rule(wording, rule_as_task_id, task_ids, exception_task_ids):
    return {
        'wording': wording,
        'rule_as_task_id': rule_as_task_id,
        'task_ids': task_ids,
        'exception_task_ids': exception_task_ids,
    }


#
# Utilities
#


class IDGenerator:
    def __init__(self):
        self._used_identifiers = set()

    def new_id(self):
        identifier = str(random.randint(100_000_000, 999_999_999))
        if identifier in self._used_identifiers:
            return self.new_id()
        self._used_identifiers.add(identifier)
        return identifier


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


def get_rule_worksheet():
    gclient = login_gspread()
    return gclient.open(SDS_NAME).worksheet(WKS_NAME)


def _rows_to_cols(rows):
    if not rows:
        return []
    cols_count = len(rows[0])
    cols = []
    for col_i in range(cols_count):
        col = list(map(lambda row: row[col_i], rows))
        cols.append(col)
    return cols


def _group_by_two(iterable):
    return list((zip(*(iter(iterable),) * 2)))


def get_rule_cols():
    wks = get_rule_worksheet()
    rows = wks.get_all_values()
    cols = _rows_to_cols(rows)
    cols_without_head = cols[1:]
    return _group_by_two(cols_without_head)


if __name__ == '__main__':
    main()
