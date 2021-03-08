module.exports = (details) => ({
    name: 'Task',
    extensions: 'java',
    path: `src.main.java.${details.folderStructure}.${details.pluginName.toLowerCase()}`,
    content: `package net.runelite.client.plugins.${details.pluginName.toLowerCase()};

import javax.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Client;
import net.runelite.api.MenuEntry;
import net.runelite.api.events.GameTick;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.CalculationUtils;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.MenuUtils;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.MouseUtils;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.ObjectUtils;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.PlayerUtils;
import net.runelite.client.plugins.${details.utils.toLowerCase()}.${details.utils};

@Slf4j
public abstract class Task
{
    public Task()
    {
    }

    @Inject
    public Client client;

    @Inject
    public ${details.pluginName}Config config;

    @Inject
    public ${details.utils} utils;

    @Inject
    public MenuUtils menu;

    @Inject
    public MouseUtils mouse;

    @Inject
    public CalculationUtils calc;

    @Inject
    public PlayerUtils playerUtils;

    @Inject
    public ObjectUtils object;

    public MenuEntry entry;

    public abstract boolean validate();

    public long sleepDelay()
    {
        ${details.pluginName}Plugin.sleepLength = calc.randomDelay(config.sleepWeightedDistribution(), config.sleepMin(), config.sleepMax(), config.sleepDeviation(), config.sleepTarget());
        return ${details.pluginName}Plugin.sleepLength;
    }

    public int tickDelay()
    {
        ${details.pluginName}Plugin.tickLength = (int) calc.randomDelay(config.tickDelayWeightedDistribution(), config.tickDelayMin(), config.tickDelayMax(), config.tickDelayDeviation(), config.tickDelayTarget());
        return ${details.pluginName}Plugin.tickLength;
    }

    public String getTaskDescription()
    {
        return this.getClass().getSimpleName();
    }

    public void onGameTick(GameTick event)
    {
        return;
    }

}
`
});