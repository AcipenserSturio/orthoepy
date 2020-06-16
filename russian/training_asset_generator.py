import json


def make_task_spec(question, answer, explanation):
    return {
        'question': question,
        'answer': answer,
        'explanation': explanation or None,
    }


def gen_specs_from_stdin():
    specs = list()

    explanation = ''
    explanation_master_lines = list()
    explanation_extra_lines = list()

    is_reading_questions = True
    is_master_mode = False
    is_extra_mode = False

    line = input().strip()
    while line != '#finish':
        if line == '#master':
            explanation_master_lines = list()
            is_reading_questions = False
            is_master_mode = True
            is_extra_mode = False
        elif line == '#extra':
            explanation_extra_lines = list()
            is_reading_questions = False
            is_master_mode = False
            is_extra_mode = True
        elif line == '#end':
            is_reading_questions = True
            is_master_mode = False
            is_extra_mode = False
            explanation = '\n'.join(
                explanation_extra_lines
                + ['']
                + explanation_master_lines
            ).strip()
        elif is_reading_questions and line:
            answer, question = line.split('\t')
            specs.append(make_task_spec(
                question,
                answer,
                explanation,
            ))
        elif is_master_mode:
            explanation_master_lines.append(line)
        elif is_extra_mode:
            explanation_extra_lines.append(line)

        line = input().strip()

    return specs


def main():
    specs = gen_specs_from_stdin()
    print(json.dumps(specs, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
