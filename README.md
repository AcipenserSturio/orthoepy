# Russian

A training tool for Russian grammar rules.

## Usage

The website is available at the following URL:

> https://acipensersturio.github.io/russian/

## How to

### Add a new test

Create a router link that opens your test.

```vue
<!-- you can also change 'training-card' to 'training-test' in case you need -->
<!-- a regular test instead of a card one -->
<router-link :to="{ name: 'training-card', params: { 'topic': 'YOUR-TEST-TOPIC' } }" class="list-item">
    THE-LINK
</router-link>
```

In `tester.js` implement a test generator for `YOUR-TEST-TOPIC`. Don't forget
to add it to `asyncTestGetter` object.

## License

Distributed under the MIT License. See the [LICENSE.md](LICENSE.md) for details.
