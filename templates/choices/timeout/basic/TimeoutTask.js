module.exports = (details) => ({
    name: 'TimeoutTask',
    extensions: 'java',
    path: `src.main.java.${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks`,
    content: `package ${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks;

import net.runelite.api.events.GameTick;
import net.runelite.client.plugins.${details.pluginName.toLowerCase()}.Task;
import net.runelite.client.plugins.${details.pluginName.toLowerCase()}.${details.pluginName}Plugin;

public class TimeoutTask extends Task
{
    @Override
    public boolean validate()
    {
        return ${details.pluginName}Plugin.timeout > 0;
    }

    @Override
    public String getTaskDescription()
    {
        return "Timeout: " + ${details.pluginName}Plugin.timeout;
    }

    @Override
    public void onGameTick(GameTick event)
    {
        ${details.pluginName}Plugin.timeout--;
    }
}`
});