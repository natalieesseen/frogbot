const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adventure')
        .setDescription('Start a new adventure 🏕️'),
    async execute(interaction) {
        const button1 = new ButtonBuilder().setCustomId('🏕️').setLabel('🏕️').setStyle(ButtonStyle.Primary);
        const button2 = new ButtonBuilder().setCustomId('🔍').setLabel('🔍').setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().addComponents(button1, button2)

        let embed = new EmbedBuilder()
        .setColor("93C98F")
        .setTitle("Your adventure begins!")
        .setDescription("You're out camping together with Frog. Frog offers to go fetch some firewood while you set up the camp. It starts getting dark, and Frog is not back yet. What do you do?")
        .setFields([
            {
                name: '🏕️',
                value: 'Stay at the camp',
                inline: true
            },
            {
                name: '🔍',
                value: 'Go look for Frog',
                inline: true
            }
        ]);

        await interaction.reply({ embeds: [embed], components: [row] })
    }
};
