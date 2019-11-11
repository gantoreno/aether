# Aether IDE

A JavaScript-based interactive code editor that performs code analysis, and runs on [Electron](https://electronjs.org/).

## Usage

To start working in this project, clone this repository:

```sh
$ git clone https://github.com/hollandsgabe/aether-ide.git
$ cd aether-ide
```

Install all necessary dependencies with `yarn`:

```sh
$ yarn
```

Finally, run the project on electron by the `electron` command:

```sh
$ yarn electron
```

And you're ready to go!

## Contribute

Regardless of the platform you are working on, you will need to have Yarn installed. If you have never installed Yarn before, you can find out how at: https://yarnpkg.com/en/docs/install.

1. Install necessary packages:

- Windows
  - Be sure to run `yarn global add windows-build-tools` from an elevated prompt (as an administrator) to install `windows-build-tools`.
- macOS
  - Once you have installed Yarn, you can skip this section!
- Linux (You can see [here](https://en.wikipedia.org/wiki/List_of_Linux_distributions) what your Linux is based on).
  - RPM-based
    - `GraphicsMagick`
    - `libicns-utils`
    - `xz` (Installed by default on some distributions.)
  - Debian-based
    - `graphicsmagick`
    - `icnsutils`
    - `xz-utils`

2. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
3. Install the dependencies: `yarn`.
4. Build the code and watch for changes: `yarn electron`.

#### Features and pull-requests

After you've cloned the repo and modified the code, you can add your feature by submitting a pull-request to the `feat` branch.

Be sure to write proper unit tests for every added feature or code fix.

#### Known issues that can happen during development

No errors have been listed yet. If you happen to find a bug, and you know how to fix it, submit your code to the `bug` branch.
