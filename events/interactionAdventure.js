const { Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { User, adventureUser } = require('../database');

// listener for adventure buttons
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        let commandUser = await adventureUser.findOne({ where: { id: interaction.user.id }});

        if(interaction.isButton()){
            if (commandUser) { 
            let choice = interaction.customId;

            let coins = Math.floor(Math.random() * 101);
            let getUser = await User.findOne({ where: { id: interaction.user.id }});
            if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

            let responses = {
                '🏕️': [
                    { id: 1, text: "As the night goes on, you wait for Frog to return... But he never does. This adventure was short-lived." },
                    { id: 2, text: "You wait for a bit, but Frog doesn't come back. You decide you need to do something, but what?" }
                ],
                '🔍': [
                    { id: 3, text: "You set out into the woods to look for Frog. You get lost. And that's the end to this adventure." },
                    { id: 4, text: "You head deeper into the woods, and arrive at a forking path. What do you do?" }
                ],
                '🍞':
                [
                    { id: 5, text: "You decide to eat some bread. It's fucking raw. You remember that you are an idiot sandwich and all you can do is cry." },
                    { id: 6, text: "You decide to eat some bread. It's pretty stale. You look around camp to see if there's anything you can add." }
                ],
                '🌼':
                [
                    { id: 7, text: "You arrive at a meadow filled with flowers. You get distracted and forget the fact that this was supposed to be an adventure." },
                    { id: 8, text: "In the middle of the meadow you find the most beautiful flower you have ever seen. What do you do?" }
                ],
                '🌲':
                [
                    { id: 9, text: "You find frog gathering firewood! The two of you head back to camp together. Not a very exciting adventure, but alas." },
                    { id: 10, text: "You walk through the woods, and suddenly, you hear some rustling in the bushes nearby. What do you do?" }
                ],
                '🍄':
                [
                    { id: 11, text: "You decide to eat some mushrooms you find. I'm pretty sure you shouldn't eat mushrooms without proper knowledge. Turns out you eat a poisonous mushroom. You become very ill. And this adventure ends." },
                    { id: 12, text: "You decide to eat some mushrooms you find. You start feeling very funny. You somehow gain energy to continue your adventure. Where do you go?" }
                ],
                '🌿':
                [
                    { id: 13, text: "You pick some herbs for your bread. It's still raw but tastes a bit better. You fall asleep and wake up the next day. Frog have returned and tells you stories of his amazing adventure. And all you did was eat and sleep.. Yikes forever." },
                    { id: 14, text: "As you are about to pick some herbs, you hear some rustling in the bushes nearby. What do you do?" } 
                ],
                '🤏':
                [
                    { id: 15, text: "You decide to pick the flower. Satisfied with your find you head back to camp where Frog is wating for you. Frog is sad you went on an adventure alone." },
                    { id: 16, text: "As you pick the flower you hear some rustling in the bushes nearby. What do you do?" } 
                ],
                '💧':
                [
                    { id: 17, text: "You give the flower some water you find in a pond nearby. Turns out the water was contaminated. The flower withers. You head back to camp empty-handed and your adventure ends." },
                    { id: 18, text: "You give the flower some water you find in a pond nearby. It begins to magically sparkle! The forest spirits rewards you. You head back to camp where frog is waiting; you tell him about your adventure!" } 
                ],
                '🌳':
                [
                    { id: 19, text: "You decide to look in the bushes. You find nothing. Must've been your imagination. You decide to head back to camp. What an anti-climax to this adventure." },
                    { id: 20, text: "You decide to look in the bushes. You find a cat! What do you do?" }  
                ],
                '💨':
                [
                    { id: 21, text: "You decide to run back to camp. You find frog at camp. You tell him what happened. Frog implies you are weak for running away. Weak." },
                    { id: 22, text: "You decide to run. You arrive at a magical pond. What do you do?" } 
                ],
                '👋':
                [
                    { id: 23, text: "You pet the cat. The cat decides to bite your hand and runs away. Oof." },
                    { id: 24, text: `You pet the cat. The cat likes it! The cat leads you to a hidden burrow. Inside you find ${coins} coins! The cat leads you back to camp where Frog is waiting. You show him your finds! Very cool!` } 
                ],
                '🐈':
                [
                    { id: 25, text: `The cat leads you back to camp where you find Frog waiting. Frog is a bit disappointed you went on an adventure without him. You give Frog ${coins} coins as an apology.` },
                    { id: 26, text: "You decide to run. You arrive at a magical pond. What do you do?" } 
                ],
                '🥤':
                [
                    { id: 27, text: "You decide to drink from the pond. It's just water. Not sure what you expected. At least you feel quenched as you head back to camp." },
                    { id: 28, text: "Just as you are about to drink from the pond you hear a scream nearby! It's Frog!! Frog is being attacked by a shrimp! What do you do?" } 
                ],
                '🧚':
                [
                    { id: 29, text: `You attempt to summon the fairy like you've seen in games and movies. The forest spirits are offended by your pathetic attempts and steals ${coins} coins from your pockets.` },
                    { id: 30, text: `You leave a prayer for the fairy and the forest spirits. They reward you with ${coins} coins. You head back to camp where you find Frog safe and sound!` } 
                ],
                '🔪':
                [
                    { id: 31, text: `You attempt to stab the shrimp but you fail. Pathetic. Shrimp steals ${coins} coins and runs away.` },
                    { id: 32, text: `You stab the shrimp. Grim. At least you saved Frog. Frog gives you ${coins} coins as a reward, and the two of you head back to camp.` }                    
                ],
                '🎣':
                [
                    { id: 33, text: `You attempt to catch the shrimp. You fail. Somehow. Shrimpy steals ${coins} coins and runs away.` },
                    { id: 34, text: `You successfully catch the shrimp! Good job? I guess? At least you saved Frog! Frog rewards you with some ${coins} coins, and the two of you head back to camp.` } 
                ]

            }

            let button1;
            let button2;
            let addButtons = false;
            let random = Math.floor(Math.random() * responses[choice].length)
            let response = responses[choice][random];

            function addCoins() {
                getUser.update(
                    { balance: getUser.balance + coins },
                    { where: { id: interaction.user.id }}
                )
            }

            function subCoins() {
                getUser.update(
                    { balance: getUser.balance - coins },
                    { where: { id: interaction.user.id }}
                )
            }

            let embed = new EmbedBuilder()
            .setColor("93C98F")
            .setDescription(response.text)

            try {
                switch (choice) {
                    case '🏕️':
                        if (response.id === 2) {
                            embed.setFields([
                                {
                                    name: '🍞',
                                    value: 'Eat some bread',
                                    inline: true
                                },
                                {
                                    name: '🔍',
                                    value: 'Go look for frog',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🍞').setLabel('🍞').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🔍').setLabel('🔍').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🔍':
                        if (response.id === 4) {
                            embed.setFields([
                                {
                                    name: '🌼',
                                    value: 'Head towards the meadow',
                                    inline: true
                                },
                                {
                                    name: '🌲',
                                    value: 'Head deeper into the woods',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🌼').setLabel('🌼').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🌲').setLabel('🌲').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🍞':
                        if (response.id === 6) {
                            embed.setFields([
                                {
                                    name: '🍄',
                                    value: 'Eat some mushrooms',
                                    inline: true
                                },
                                {
                                    name: '🌿',
                                    value: 'Pick some herbs',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🍄').setLabel('🍄').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🌿').setLabel('🌿').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🌼':
                        if (response.id === 8) {
                            embed.setFields([
                                {
                                    name: '🤏',
                                    value: 'Pick the flower',
                                    inline: true
                                },
                                {
                                    name: '💧',
                                    value: 'Water the flower',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🤏').setLabel('🤏').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('💧').setLabel('💧').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🌲':
                        if (response.id === 10) {
                            embed.setFields([
                                {
                                    name: '🌳',
                                    value: 'Look in the bushes',
                                    inline: true
                                },
                                {
                                    name: '💨',
                                    value: 'Run away',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🌳').setLabel('🌳').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('💨').setLabel('💨').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🍄':
                        if (response.id === 12) {
                            embed.setFields([
                                {
                                    name: '🌼',
                                    value: 'Head towards the meadow',
                                    inline: true
                                },
                                {
                                    name: '🌲',
                                    value: 'Head deeper into the woods',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🌼').setLabel('🌼').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🌲').setLabel('🌲').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🌿':
                        if (response.id === 14) {
                            embed.setFields([
                                {
                                    name: '🌳',
                                    value: 'Look in the bushes',
                                    inline: true
                                },
                                {
                                    name: '💨',
                                    value: 'Run away',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🌳').setLabel('🌳').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('💨').setLabel('💨').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🤏':
                        if (response.id === 16) {
                            embed.setFields([
                                {
                                    name: '🌳',
                                    value: 'Look in the bushes',
                                    inline: true
                                },
                                {
                                    name: '💨',
                                    value: 'Run away',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🌳').setLabel('🌳').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('💨').setLabel('💨').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🌳':
                        if (response.id === 20) {
                            embed.setFields([
                                {
                                    name: '👋',
                                    value: 'Pet the cat',
                                    inline: true
                                },
                                {
                                    name: '🐈',
                                    value: 'Follow the cat',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('👋').setLabel('👋').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🐈').setLabel('🐈').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '💨':
                        if (response.id === 22) {
                            embed.setFields([
                                {
                                    name: '🥤',
                                    value: 'Drink from the pond',
                                    inline: true
                                },
                                {
                                    name: '🧚',
                                    value: 'Summon the forest fairy',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🥤').setLabel('🥤').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🧚').setLabel('🧚').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '👋':
                        if (response.id === 24) {
                            addCoins();
                        }
                    break;
                    case '🐈':
                        if (response.id === 25) {
                            subCoins();
                        }
                        if (response.id === 26) {
                            embed.setFields([
                                {
                                    name: '🥤',
                                    value: 'Drink from the pond',
                                    inline: true
                                },
                                {
                                    name: '🧚',
                                    value: 'Summon the forest fairy',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🥤').setLabel('🥤').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🧚').setLabel('🧚').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🥤':
                        if (response.id === 28) {
                            embed.setFields([
                                {
                                    name: '🔪',
                                    value: 'Stab the shrimp',
                                    inline: true
                                },
                                {
                                    name: '🎣',
                                    value: 'Catch the shrimp',
                                    inline: true
                                }
                            ]);
                            button1 = new ButtonBuilder().setCustomId('🔪').setLabel('🔪').setStyle(ButtonStyle.Primary);
                            button2 = new ButtonBuilder().setCustomId('🎣').setLabel('🎣').setStyle(ButtonStyle.Primary);
                            addButtons = true;
                        }
                    break;
                    case '🧚':
                        if (response.id === 29) {
                            subCoins();               
                        }
                        if (response.id === 30) {
                            addCoins();
                        }
                    break;
                    case '🔪':
                        if (response.id === 31) {
                            subCoins();
                        }
                        if (response.id === 32) {
                            addCoins();
                        }
                    break;
                    case '🎣':
                        if (response.id === 33) {
                            subCoins();
                        }
                        if (response.id === 34) {
                            addCoins();
                        }
                    break;
                }
                
                let row = new ActionRowBuilder().addComponents(button1, button2);

                if (addButtons) {
                    await interaction.reply({ embeds: [embed], components: [row] })
                } else {
                    await interaction.reply({ embeds: [embed]})
                    await adventureUser.destroy({ where: { id: interaction.user.id }});
                }

            } catch (error) {
            console.log(error)
        }
        } else {
            console.log('invalid user')
        }
    }
    }
};