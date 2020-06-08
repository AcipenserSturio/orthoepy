import { areArraysEqual } from '@/utils';

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

  static areValuesEqual() {
    throw new TypeError('Must override "isValueEqual()"');
  }
}

//
// Option Prompts
//

export class CheckboxPrompt extends BasePrompt {
  constructor(options) {
    super();

    this.options = [...options];
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

  static areValuesEqual(value1, value2) {
    return areArraysEqual(value1, value2);
  }
}

export class RadioPrompt extends BasePrompt {
  constructor(options) {
    super();

    this.options = [...options];
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

  static areValuesEqual(value1, value2) {
    return value1 === value2;
  }
}

export class ButtonPrompt extends BasePrompt {
  constructor(options) {
    super();

    this.options = [...options];
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

  static areValuesEqual(value1, value2) {
    return value1 === value2;
  }
}

//
// Other Prompts
//

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

  static areValuesEqual(value1, value2) {
    return value1 === value2;
  }
}

export class NullPrompt extends BasePrompt {
  static type() {
    return 'null';
  }

  static default() {
    return null;
  }

  static normalizeValue() {
    return null;
  }

  static areValuesEqual() {
    return false;
  }
}
