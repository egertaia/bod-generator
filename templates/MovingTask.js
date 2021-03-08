module.exports = (details) => ({
    name: 'MovingTask',
    extensions: 'java',
    path: `src.main.java.${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks`,
    content: `package ${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks;

import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Player;
import net.runelite.api.events.GameTick;
import net.runelite.client.plugins.${details.pluginName.toLowerCase()}.Task;
import net.runelite.client.plugins.${details.pluginName.toLowerCase()}.${details.pluginName}Plugin;

@Slf4j
public class MovingTask extends Task
{

    @Override
    public boolean validate()
    {
        return playerUtils.isMoving(${details.pluginName}Plugin.beforeLoc);
    }

    @Override
    public String getTaskDescription()
    {
        return ${details.pluginName}Plugin.status;
    }

    @Override
    public void onGameTick(GameTick event)
    {
        Player player = client.getLocalPlayer();
        if (player != null)
        {
            playerUtils.handleRun(20, 30);
            ${details.pluginName}Plugin.timeout = tickDelay();
        }
    }
}`
});