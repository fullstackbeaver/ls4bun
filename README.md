# ls4bun
*A Lightweight Server for Bun*


ls4bun is designed to be a minimal and secure overlay to bun server. It offers simplified routings like static routes. It includes a secure deserialization of the body in requests and an optional validation system of input and output schemas. Finally it integrates a system of middlewares.

It is currently in development.

## Roadmap

### Router
- [X] OK

### Security
- [ ] Include something like helmet (maybe Elysia Helmet)
- [X] Extract safely JSON from body
- [X] Add schema check of input in POST
- [X] Add schema check of output in order to validate everything was OK

### Tests
- [ ] Add test coverage (WIP)

### Documentation
- [ ] Write documentation (WIP)
- [ ] Complete this README
- [ ] Add examples (input schema and output schema are missing)
- [ ] Explain how middlewares are used
- [ ] Explain how to use server reload on file change
- [ ] Explain how to export this server as a module
- [ ] Explain why suretype vs zod or ajv
- [ ] Explain how use extracted body
- [ ] Explain middlewares, how to set it and safe extract is added each time in first step

### Other
- [ ] Add automatic server restart on file change (using an external library: ls4bun-watcher)
- [ ] Standardize output request for routes handlers
- [ ] Add watcher for hot reload when exposed folders change
- [X] Add SonarCloud
- [X] Add SonarCloud evaluation
- [X] Fix errors found by SonarCloud
- [ ] Test to export as a model
- [ ] Remove source in main branch (automation)

## security
ls4bun natively includes security elements:
* the body of requests is cleaned to prevent XSS attacks and manages the possibility of a malformed json used sometimes in DDOS attacks
* to prevent XSS attacks in queries, a function sanitizeString is available
* ls4bun ensures the possibility of checking input and output schemas if necessary. The validation can be done with the library of your choice.

The cleaning for XSS attacks is ensured by the [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify) module.

## install
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## Contributing to ls4bun
Thank you for your interest in contributing to ls4bun! We appreciate your efforts to improve this project. Here's a guide to help you get started.

### How to Contribute
1. Fork the Repository
Fork the repository to your own GitHub account by clicking the "Fork" button at the top right of this page.

2. Clone the Repository
Clone the forked repository to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/repository-name.git
```

3. Create a Branch
Create a new branch for your contribution:
```bash
git checkout -b your-branch-name
```

4. Make Changes
Make your changes to the code. Ensure you follow the project's coding conventions and best practices.

5. Test Your Changes
Run tests to ensure your changes do not introduce regressions. If tests are missing, please add them.

6. Commit Your Changes
Add and commit your changes with clear and concise commit messages:
```bash
git add .
git commit -m "Clear description of your changes"
```

7. Push Your Changes
Push your changes to your forked repository:
```bash
git push origin your-branch-name
```

8. Open a Pull Request
Go to your forked repository on GitHub and click the "Compare & pull request" button. Fill out the form and submit your pull request.

9. Code Review
Your pull request will be reviewed by the project maintainers. Be prepared to make changes based on feedback.

### Coding Guidelines
Follow the existing coding conventions in the project.
Write clear comments and use meaningful variable names.
Add tests for your changes if possible.

### Reporting a Bug
If you find a bug, please open an issue with a detailed description of the problem and steps to reproduce it.

## Sonar Cloud evaluation

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ls4bun&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ls4bun)