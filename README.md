### ember-cli-programmatic-usage

This repository might serve to document how ember-cli can be consumed by other build systems.

[consumption](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg/261px-Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg)


##### status: broken

Currently attempts programmtic usage of
(ember-cli)[http://ember-cli.com/]
for use cases where the
(ember)[http://emberjs.com/]
source tree is not located in the directory where the build is run.

The build succeeds in producing broken javascript.  The generated javascript contains

    require("undefined/app")["default"].create({});

suggesting that this setup leaves a variable needed by the ember-cli build system undefined.

(Word has it)[https://github.com/ember-cli/ember-cli/issues/5103]
that the ember-cli configuration story "blows."  As ember-cli evolves, so too might this repository.

##### if you'd like to give it a spin anyways...

1. Use node version 5.3.0 and npm version 3.3.12.

2. Make certain the `ember` and `bower` commands are globally installed
   by running `npm install -g ember-cli bower`.
   (The global `ember` command will use a local version of
    ember-cli if it's available, which is a cool.)

3. `npm install`

