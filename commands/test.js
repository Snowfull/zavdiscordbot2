module.exports = {
	name: 'test',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};