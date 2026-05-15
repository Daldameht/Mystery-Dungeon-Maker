# Mystery Dungeon Maker

A tiny browser prototype for a shareable, mystery-dungeon-style creator game.

## Current prototype loop

- Tune dungeon parameters such as floors, rooms per floor, monster rate, monster respawn pressure, monster limit, item rate, trap density, gold bundle size, rare loot, cursed item rate, starting equipment, and starting inventory.
- Optionally enable hunger, show it on the HUD, and choose how many turns it takes to lose 1 hunger.
- Toggle weapon rarity on or off, edit built-in rarity tiers, and add as many extra rarity tiers as you want with custom names, multipliers, colors, and animation effects.
- Limit inventory spaces, with an option for equipped items to count toward that limit.
- Enable global environmental effects and choose whether each one affects the player, enemies, or both.
- Enable special rooms such as a shopkeeper room, monster house, and gambling room.
- Customize the item pool by category, choosing which categories and items can spawn.
- Customize a trap pool with built-in and custom traps, editable trap values, and supported trap effect types such as damage, hunger drain, debuffs, and warp.
- Customize an enemy pool of monster families with four editable levels each, including enable toggles and HP/Attack/Defense/XP values.
- Monster respawns can be disabled or pushed to aggressively refill dead enemies, while still spawning away from the player in other rooms.
- Generate a dungeon run from those parameters using room-and-corridor floor layouts.
- Toggle dungeon gridlines for either tile-by-tile readability or a smoother seamless-floor look.
- Each floor randomly selects one enabled environmental effect and announces it in the run log.
- Explore floors through fog-of-war: each floor starts unknown, then rooms and lantern-lit tiles reveal as you move.
- Explore different environment themes with generated hazards such as fungus spores, ember pools, and ice patches.
- Copy the share code and send it to another player.
- Paste a share code and load the same dungeon recipe.
- Publish recipes locally to a browser-saved dungeon list with play, copy, delete, best-floor, and clear tracking.
- Fight monsters with attack/defense stats, collect gear, use grass and food, gather gold coin bundles, avoid traps, and reach the stairs.
- Scrolls can dispel curses, upgrade swords, upgrade shields, or erase all traps on the floor.
- Scroll item-pool rules can enable an inventory-effect chance; upgrade scrolls may boost the same item multiple times up to +3.
- Staffs act as ranged inventory weapons: choose a direction, launch a blue orb, and damage the first enemy hit.
- Equip swords or shields in either hand, and use two bracelet slots for passive effects.
- Floor item curses are rolled per spawned item, based on the recipe's cursed item rate.
- Starting equipment and starting inventory can each be marked cursed per slot.
- Cursed items stay hidden until use or equip; revealed cursed items show a skull marker.
- Non-cursed equipped items can be removed back to inventory; cursed hand items stay locked.
- Spawned swords and shields roll per-item rarity, changing their stat strength: uncommon is 1.5x base, rare is stronger again and shown in gold.
- Weapon rarity visuals come from editable recipe colors and effects, so highlighted inventory and equipment cards follow the current rarity settings.
- Use `1` or `H` for Bitter Grass, `2` for Moss Grass, and `3` for Ember Grass.
- Food restores hunger, hunger can regenerate HP each turn, and starving at 0 hunger causes 1 HP loss per turn.
- Use the always-open inventory panel to equip carried gear, use items, or drop items.
- If inventory is full, items stay on the floor and can still be used from the Floor box.

## Next good steps

- Add deeper turn order rules such as speed, ranged attacks, and status effects.
- Add item affixes, buffs, curses, and creator-controlled item pools.
- Add custom environmental effects, weighted floor schedules, and creator-authored effect rules.
- Add ratings, tags, search filters, and import/export for published local dungeons.
- Add room templates, landmarks, and locked/keyed dungeon branches.
- Add creator tags, difficulty estimates, and win/loss stats.
- Move from local share codes to online sharing when the core game is fun.
