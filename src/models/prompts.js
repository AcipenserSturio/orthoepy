import { areArraysEqual } from '@/utils';

export class BasePrompt {
  static type() {
    throw new TypeError('Must override "type()"');
  }

  static default() {
    throw new TypeError('Must override "default()"');
  }

  static areEqualByContent() {
    throw new TypeError('Must override "areEqualByContent()"');
  }
}

//
// Normalizers and Defaults
//

const optionDefault = '';
const optionsDefault = [];
const textDefault = '';

function normalizeOption(value) {
  if (!value) {
    return optionDefault;
  }

  return value;
}

function normalizeOptions(value) {
  if (!value) {
    return optionsDefault;
  }

  return [...value].sort();
}

function normalizeText(value) {
  if (!value) {
    return textDefault;
  }

  return value.toLowerCase();
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
    return optionsDefault;
  }

  static areEqualByContent(v1, v2) {
    return areArraysEqual(normalizeOptions(v1), normalizeOptions(v2));
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
    return optionDefault;
  }

  static normalizeValue(value) {
    if (!value) {
      return this.default();
    }
    return value.toLowerCase();
  }

  static areEqualByContent(v1, v2) {
    return normalizeOption(v1) === normalizeOption(v2);
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
    return optionDefault;
  }

  static normalizeValue(value) {
    if (!value) {
      return this.default();
    }
    return value.toLowerCase();
  }

  static areEqualByContent(v1, v2) {
    return normalizeOption(v1) === normalizeOption(v2);
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
    return textDefault;
  }

  static areEqualByContent(v1, v2) {
    return normalizeText(v1) === normalizeText(v2);
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

  static areEqualByContent() {
    return null;
  }
}
