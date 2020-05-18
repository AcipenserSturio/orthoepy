import json


def make_insert_letter_object(word, letter, explanation):
    return {
        'word': word,
        'letter': letter,
        'explanation': explanation,
    }


def generate_objects_from_stdin():
    objects = list()

    explanation = input().replace('\\n', '\n')
    pair = input()
    while pair not in {'NEXT', 'DONE'}:
        letter, word = pair.split(maxsplit=1)
        objects.append(make_insert_letter_object(
            word,
            letter,
            explanation,
            ))
        pair = input()

    if pair == 'NEXT':
        objects += generate_objects_from_stdin()

    return objects


def main():
    objects = generate_objects_from_stdin()
    print(json.dumps(objects, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
