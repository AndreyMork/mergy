#! make

MAKEFLAGS += --silent
GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)

install:
	yarn install && \
	yarn flow-typed install
	yarn outdated
	yarn audit
.PHONY: install

clean:
	rm -rf node_modules flow-typed \
	yarn.lock yarn-error.log \
	dist coverage reports
.PHONY: clean

build:
	NODE_ENV=production && \
	yarn babel src --out-dir dist \
	--copy-files --include-dotfiles --delete-dir-on-start --verbose
.PHONY: build

test:
	NODE_ENV=test \
	yarn test
.PHONY: test

stryker:
	NODE_ENV=test \
	yarn stryker run
.PHONY: stryker

lint:
	yarn eslint .
.PHONY: lint

flow:
	yarn flow
.PHONY: flow

full-test: lint flow test
.PHONY: full-test

prettier:
	yarn prettier-eslint --write "src/**/*.js"
.PHONY: prettier

test-publish: build full-test
	yarn semantic-release --dry-run --branch $(GIT_BRANCH)
.PHONY: test-publish

publish:
	yarn semantic-release
.PHONY: publish
