import { isArraysEqual } from '@/utils';


export class BasePrompt {
  static type() {
    throw new TypeError('Must override "type()"');
  }

  static default() {
    throw new TypeError('Must override "default()"');
  }

  static normalizeValue() {
    throw new TypeError('Must override "normalizeValue()"');
  }

  static isValuesEqual() {
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
    if (!value) {
      return this.default();
    }
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
    if (!value) {
      return this.default();
    }
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
    if (!value) {
      return this.default();
    }
    return value.toLowerCase();
  }

  static isValuesEqual(value1, value2) {
    return value1 === value2;
  }
}

export class ButtonPrompt extends BasePrompt {
  constructor(buttons) {
    super();

    this.buttons = [...buttons];
  }

  static type() {
    return 'button';
  }

  static default() {
    return '';
  }

  static normalizeValue(value) {
    if (!value) {
      return this.default();
    }
    return value.toLowerCase();
  }

  static isValuesEqual(value1, value2) {
    return value1 === value2;
  }
}
