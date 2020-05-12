import json


def make_insert_letter_object(word, letter, explanation):
    return {
        'word': word,
        'letter': letter,
        'explanation': explanation,
    }


def main():
    objects = list()

    explanation = input().replace('\\n', '\n')

    pair = input()
    while pair != 'DONE':
        word, letter = pair.split()
        objects.append(make_insert_letter_object(
            word,
            letter,
            explanation,
            ))
        pair = input()

    print(json.dumps(objects, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
