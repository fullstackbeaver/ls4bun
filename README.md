# ls4bun
*A Lightweight Server for Bun*

ls4bun is designed to be as minimal and secure as possible.

It is currently in development.

## Roadmap

### Router
- [X] Handle routes using string comparison
- [ ] Handle routes using regular expressions (RegExp)
- [ ] Extract parameters using regular expressions (RegExp)

### Security
- [ ] Include something like helmet
- [ ] Extract safely JSON from body
- [ ] Add schema check of input in POST
- [ ] Add schema check of output in order to validate everything was OK

### Tests
- [ ] Add test coverage

### Documentation
- [ ] Write documentation
- [ ] Complete this README
- [ ] Add examples
- [ ] Explain how middlewares are used
- [ ] Explain how to use server reload on file change
- [ ] Explain how to export this server as a module
- [ ] Add SonarCloud score in this file

### Other
- [ ] Add server reload on file change
- [ ] Standardize output request for routes handlers
- [ ] Add SonarCloud evaluation
- [ ] Add watcher for hot reload when exposed folders change
- [X] Add SonarCloud
- [ ] Test to export as a model

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

### Reporting a Bug
If you find a bug, please open an issue with a detailed description of the problem and steps to reproduce it.