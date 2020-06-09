import { areArraysEqual } from '@/utils';

//
// Normalizers
//

function normalizeString(string) {
  return string.toLowerCase();
}

function normalizeStringArray(stringArray) {
  const sortedStringArray = [...stringArray].sort();
  sortedStringArray.map(string => normalizeString(string));
  return sortedStringArray;
}

//
// Base Prompts
//

export class BasePrompt {
  static get POSITION_IN_CARD_CONTENT() {
    return 'content';
  }

  static get POSITION_IN_CARD_FOOTER() {
    return 'footer';
  }

  static get VALUE_TYPE_STRING() {
    return String;
  }

  static get VALUE_TYPE_STRING_ARRAY() {
    return Array;
  }

  static get positionInCard() {
    throw TypeError('This member must be overridden');
  }

  static get valueType() {
    throw TypeError('This member must be overridden');
  }

  static get defaultValue() {
    throw TypeError('This member must be overridden');
  }

  static areValuesEqualByContent() {
    throw TypeError('This member must be overridden');
  }
}

export class BaseStringArrayPrompt extends BasePrompt {
  static get valueType() {
    return this.VALUE_TYPE_STRING_ARRAY;
  }

  static get defaultValue() {
    return [];
  }

  static areValuesEqualByContent(lhs, rhs) {
    return areArraysEqual(normalizeStringArray(lhs), normalizeStringArray(rhs));
  }
}

export class BaseStringPrompt extends BasePrompt {
  static get valueType() {
    return this.VALUE_TYPE_STRING;
  }

  static get defaultValue() {
    return '';
  }

  static areValuesEqualByContent(lhs, rhs) {
    return normalizeString(lhs) === normalizeString(rhs);
  }
}

//
// Prompts
//

export class TextPrompt extends BaseStringPrompt {
  constructor(placeholder) {
    super();

    this.placeholder = placeholder;
  }

  static get positionInCard() {
    return this.POSITION_IN_CARD_CONTENT;
  }
}

export class CheckboxPrompt extends BaseStringArrayPrompt {
  constructor(checkboxes) {
    super();

    this.checkboxes = checkboxes;
  }

  static get positionInCard() {
    return this.POSITION_IN_CARD_CONTENT;
  }
}

export class RadioPrompt extends BaseStringPrompt {
  constructor(radios) {
    super();

    this.radios = radios;
  }

  static get positionInCard() {
    return this.POSITION_IN_CARD_CONTENT;
  }
}

export class RadioButtonPrompt extends BaseStringPrompt {
  constructor(radioButtons) {
    super();

    this.radioButtons = radioButtons;
  }

  static get positionInCard() {
    return this.POSITION_IN_CARD_FOOTER;
  }
}
