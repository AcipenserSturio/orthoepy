export class BaseExplanation {
  static type() {
    throw new TypeError('Must override "type()"');
  }
}

export class TextExplanation extends BaseExplanation {
  constructor(text) {
    super();

    this.text = text;
  }

  static type() {
    return 'text';
  }
}

export class RuleChainExplanation extends BaseExplanation {
  constructor(ruleChain, result) {
    super();

    this.ruleChain = [...ruleChain];
    this.result = result;
  }

  static type() {
    return 'rule_chain';
  }
}
