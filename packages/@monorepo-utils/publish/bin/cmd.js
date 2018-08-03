#!/usr/bin/env node
const run = require("../lib/cli").run;

run().catch(error => {
    console.error(error);
    process.exit(1);
});
