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

function normalizeNull() {
  return null;
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

  static get VALUE_TYPE_NULL() {
    return null;
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

  // eslint-disable-next-line class-methods-use-this
  toJSON() {
    throw new TypeError('Must override "type()"');
  }

  static fromJSON() {
    throw new TypeError('Must override "type()"');
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

  toJSON() {
    const className = this.constructor.name;
    const { placeholder } = this;

    return { className, placeholder };
  }

  static fromJSON(obj) {
    const { placeholder } = obj;

    return new this(placeholder);
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

  toJSON() {
    const className = this.constructor.name;
    const { checkboxes } = this;

    return { className, checkboxes };
  }

  static fromJSON(obj) {
    const { checkboxes } = obj;

    return new this(checkboxes);
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

  toJSON() {
    const className = this.constructor.name;
    const { radios } = this;

    return { className, radios };
  }

  static fromJSON(obj) {
    const { radios } = obj;

    return new this(radios);
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

  toJSON() {
    const className = this.constructor.name;
    const { radioButtons } = this;

    return { className, radioButtons };
  }

  static fromJSON(obj) {
    const { radioButtons } = obj;

    return new this(radioButtons);
  }
}

export class SelfCheckPrompt extends BasePrompt {
  static get valueType() {
    return this.VALUE_TYPE_NULL;
  }

  static get defaultValue() {
    return null;
  }

  static areValuesEqualByContent(lhs, rhs) {
    return normalizeNull(lhs) === normalizeNull(rhs);
  }

  static get positionInCard() {
    return this.POSITION_IN_CARD_FOOTER;
  }

  toJSON() {
    const className = this.constructor.name;

    return { className };
  }

  static fromJSON() {
    return new this();
  }
}

export function promptClass(className) {
  switch (className) {
  case 'TextPrompt':
    return TextPrompt;
  case 'CheckboxPrompt':
    return CheckboxPrompt;
  case 'RadioPrompt':
    return RadioPrompt;
  case 'RadioButtonPrompt':
    return RadioButtonPrompt;
  case 'SelfCheckPrompt':
    return SelfCheckPrompt;
  default:
    return undefined;
  }
}
