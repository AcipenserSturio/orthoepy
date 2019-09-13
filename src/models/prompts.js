import { isArraysEqual } from '@/utils';


export class BasePrompt {
  constructor() {}

  static type() {
    throw new TypeError('Must override "type()"');
  }
  static default() {
    throw new TypeError('Must override "default()"');
  }

  static normalizeValue(value) {
    throw new TypeError('Must override "normalizeValue()"');
  }
  static isValuesEqual(value1, value2) {
    throw new TypeError('Must override "isValuesEqual()"');
  }
}

export class CheckboxPrompt extends BasePrompt {
  constructor(checkboxes) {
    super();

    this.checkboxes = [...checkboxes];
  }

  static type() {
    return 'checkbox';
  }
  static default() {
    return [];
  }

  static normalizeValue(value) {
    return [...value].sort();
  }
  static isValuesEqual(value1, value2) {
    return isArraysEqual(value1, value2);
  }
}

export class RadioPrompt extends BasePrompt {
  constructor(radios) {
    super();

    this.radios = [...radios];
  }

  static type() {
    return 'radio';
  }
  static default() {
    return '';
  }

  static normalizeValue(value) {
    return value.toLowerCase();
  }
  static isValuesEqual(value1, value2) {
    return value1 === value2;
  }
}

export class TextPrompt extends BasePrompt {
  constructor(placeholder) {
    super();

    this.placeholder = placeholder;
  }

  static type() {
    return 'text';
  }
  static default() {
    return '';
  }

  static normalizeValue(value) {
    return value.toLowerCase();
  }
  static isValuesEqual(value1, value2) {
    return value1 === value2;
  }
}
