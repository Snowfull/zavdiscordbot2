module.exports = {
	name: 'servercount',
	description: 'Server count!',
	execute(message, args) {
		message.channel.send(message.channel.send(`We currently have`));
	},
};