<p align="center">
  <a href="https://github.com/sunnhas/tf-http-backend-setup-action/actions"><img alt="tf-http-backend-setup-action status" src="https://github.com/sunnhas/tf-http-backend-setup-action/workflows/build-test/badge.svg"></a>
</p>

# tf-http-backend-setup-action

This action install and configure the usage of [tf-http-backend](https://github.com/sunnhas/tf-http-backend) within
GitHub actions.

## Usage

```yaml
- name: Setup tf-http-backend
  uses: sunnhas/tf-http-backend-setup-action@v1
  with:
    version: v0.1.0 # defaults to latest
```
