install:
	npm install

gendiff-help:
	npm run babel-node -- ./src/bin/gendiff.js -h

gendiff-run:
	npm run babel-node -- ./src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

build:
	rm -rf dist
	npm run build

test:
	npm test

publish:
	npm publish

lint:
	npm run eslint .

.PHONY: test
