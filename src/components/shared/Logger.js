import chalk from 'chalk';
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const colors = {
	TRACE: chalk.magenta,
	DEBUG: chalk.cyan,
	INFO: chalk.blue,
	WARN: chalk.yellow,
	ERROR: chalk.red
};
prefix.reg(log);

if (process.env.NODE_ENV === 'production') {
	log.setDefaultLevel('warn');
} else {
	log.enableAll();
}

prefix.apply(log, {
	format(level, name, timestamp) {
		return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](
			level
		)} ${chalk.green(`${name}:`)}`;
	}
});

prefix.apply(log.getLogger('critical'), {
	format(level, name, timestamp) {
		return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
	}
});

export default log;
