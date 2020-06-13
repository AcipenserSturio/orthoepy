export class BaseExplanation {
  static type() {
    throw new TypeError('Must override "type()"');
  }

  // eslint-disable-next-line class-methods-use-this
  toJSON() {
    throw new TypeError('Must override "type()"');
  }

  static fromJSON() {
    throw new TypeError('Must override "type()"');
  }
}

export class TextExplanation extends BaseExplanation {
  constructor(text) {
    super();

    this.text = text;
  }

  toJSON() {
    const className = this.constructor.name;
    const { text } = this;

    return { className, text };
  }

  static fromJSON(obj) {
    const { text } = obj;

    return new this(text);
  }
}

export class RuleChainExplanation extends BaseExplanation {
  constructor(ruleChain) {
    super();

    this.ruleChain = [...ruleChain];
  }

  toJSON() {
    const className = this.constructor.name;
    const { ruleChain } = this;

    return { className, ruleChain };
  }

  static fromJSON(obj) {
    const { ruleChain } = obj;

    return new this(ruleChain);
  }
}
