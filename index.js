const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    Events
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// NOVO TOKEN
const TOKEN = '';

// ID DO CARGO
const ROLE_ID = '1507158580053283019';

// ID DO CANAL
const CHANNEL_ID = '1507164766089773168';

client.once('clientReady', async () => {
    console.log(`✅ Bot ligado como ${client.user.tag}`);

    try {

        const channel = await client.channels.fetch(CHANNEL_ID);

        const embed = new EmbedBuilder()
            .setTitle('🌑 Shadow Community - Verificação')
            .setDescription(`
🔒 Clique no botão abaixo para se verificar.

Após verificar, você terá acesso completo ao servidor.
            `)
            .setColor('#7d2cff')
            .setFooter({ text: 'Shadow Community ©' });

        const button = new ButtonBuilder()
            .setCustomId('verificar')
            .setLabel('Verificar')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        console.log('✅ Mensagem de verificação enviada');

    } catch (erro) {
        console.log('❌ Erro:', erro.message);
    }
});

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isButton()) return;

    if (interaction.customId === 'verificar') {

        const role = interaction.guild.roles.cache.get(ROLE_ID);

        await interaction.member.roles.add(role);

        await interaction.reply({
            content: '✅ Você foi verificado com sucesso!',
            ephemeral: true
        });
    }
});

client.login(TOKEN);