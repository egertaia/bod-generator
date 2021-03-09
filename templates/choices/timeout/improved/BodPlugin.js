const _ = require('lodash');

module.exports = (details) => ({
            name: 'BodPlugin',
            extensions: 'java',
            path: `src.main.java.${details.folderStructure}.${details.pluginName.toLowerCase()}`,
            content: `package ${details.folderStructure}.${details.pluginName.toLowerCase()};

import com.google.inject.Injector;
import com.google.inject.Provides;
import java.time.Duration;
import java.time.Instant;
import javax.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Client;
import net.runelite.api.GameState;
import net.runelite.api.MenuEntry;
import net.runelite.api.Player;
import net.runelite.api.coords.LocalPoint;
import net.runelite.api.events.ConfigButtonClicked;
import net.runelite.api.events.GameTick;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.eventbus.Subscribe;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDependency;
import net.runelite.client.plugins.PluginDescriptor;
import ${details.breakhandler.toLowerCase() === 'bodUtils' ? details.folderStructure : `com.owain`}.${details.breakhandler.toLowerCase()}.${details.breakhandler};
import ${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks.MovingTask;
import ${details.folderStructure}.${details.pluginName.toLowerCase()}.tasks.TimeoutTask;
import ${details.folderStructure}.${details.utils.toLowerCase()}.${details.utils};
import net.runelite.client.ui.overlay.OverlayManager;
import org.pf4j.Extension;


@Extension
@PluginDependency(${details.utils}.class)
@PluginDescriptor(
    name = "${details.pluginName}",
    enabledByDefault = false,
    description = "${details.pluginName} plugin",
    tags = {"bod", "task", "template", "bot"}
)
@Slf4j
public class ${details.pluginName}Plugin extends Plugin
{
    @Inject
    private Injector injector;

    @Inject
    private Client client;

    @Inject
    private ${details.pluginName}Config config;

    @Inject
    private OverlayManager overlayManager;

    @Inject
    private ${details.pluginName}Overlay overlay;

    @Inject
    private ${details.utils} utils;

    @Inject
    public ${details.breakhandler} ${_.camelCase(`${details.breakhandler}`)};

    @Inject
    private ConfigManager configManager;

    private TaskSet tasks = new TaskSet();
    public static LocalPoint beforeLoc = new LocalPoint(0, 0);

    MenuEntry targetMenu;
    Instant botTimer;
    Player player;

    public static boolean startBot;
    public static long sleepLength;
    public static int tickLength;
    public static int timeout;
    public static String status = "starting...";
    public static ConditionTimeout conditionTimeout;
    public static boolean timeoutFinished;

    @Provides
    ${details.pluginName}Config provideConfig(ConfigManager configManager)
    {
        return configManager.getConfig(${details.pluginName}Config.class);
    }

    @Override
    protected void startUp()
    {
        ${_.camelCase(`${details.breakhandler}`)}.registerPlugin(this);
    }

    @Override
    protected void shutDown()
    {
        resetVals();
        ${_.camelCase(`${details.breakhandler}`)}.unregisterPlugin(this);
    }


    private void loadTasks()
    {
        tasks.clear();
        tasks.addAll(
            injector.getInstance(TimeoutTask.class),
            injector.getInstance(MovingTask.class)
        );
    }

    public void resetVals()
    {
        log.debug("stopping Task Template plugin");
        overlayManager.remove(overlay);
        ${_.camelCase(`${details.breakhandler}`)}.stopPlugin(this);
        startBot = false;
        botTimer = null;
        tasks.clear();
    }

    @Subscribe
    private void onConfigButtonPressed(ConfigButtonClicked configButtonClicked)
    {
        if (!configButtonClicked.getGroup().equalsIgnoreCase("iTaskTemplate"))
        {
            return;
        }
        log.debug("button {} pressed!", configButtonClicked.getKey());
        if (configButtonClicked.getKey().equals("startButton"))
        {
            if (!startBot)
            {
                Player player = client.getLocalPlayer();
                if (client != null && player != null && client.getGameState() == GameState.LOGGED_IN)
                {
                    log.info("starting Task Template plugin");
                    loadTasks();
                    startBot = true;
                    ${_.camelCase(`${details.breakhandler}`)}.startPlugin(this);
                    timeout = 0;
                    targetMenu = null;
                    botTimer = Instant.now();
                    overlayManager.add(overlay);
                    beforeLoc = client.getLocalPlayer().getLocalLocation();
                }
                else
                {
                    log.info("Start logged in");
                }
            }
            else
            {
                resetVals();
            }
        }
    }

    public void updateStats()
    {
        //templatePH = (int) getPerHour(totalBraceletCount);
        //coinsPH = (int) getPerHour(totalCoins - ((totalCoins / BRACELET_HA_VAL) * (unchargedBraceletCost + revEtherCost + natureRuneCost)));
    }

    public long getPerHour(int quantity)
    {
        Duration timeSinceStart = Duration.between(botTimer, Instant.now());
        if (!timeSinceStart.isZero())
        {
            return (int) ((double) quantity * (double) Duration.ofHours(1).toMillis() / (double) timeSinceStart.toMillis());
        }
        return 0;
    }

    @Subscribe
    private void onGameTick(GameTick event)
    {
        if (!startBot || ${_.camelCase(`${details.breakhandler}`)}.isBreakActive(this))
        {
            return;
        }
        player = client.getLocalPlayer();
        if (client != null && player != null && client.getGameState() == GameState.LOGGED_IN)
        {
            if (${_.camelCase(`${details.breakhandler}`)}.shouldBreak(this))
            {
                status = "Taking a break";
                ${_.camelCase(`${details.breakhandler}`)}.startBreak(this);
                timeout = 5;
            }

            Task task = tasks.getValidTask();
            if (task != null)
            {
                status = task.getTaskDescription();
                task.onGameTick(event);

                if (timeoutFinished)
                {
                    if (timeout > 0)
                    {
                        return;
                    }

                    Task newTask = tasks.getValidTask();
                    if (newTask != null)
                    {
                        newTask.onGameTick(event);
                        status = task.getTaskDescription();
                    } else
                    {
                        status = "Idle";
                    }

                    timeoutFinished = false;
                }
            }
            else
            {
                status = "Task not found";
                log.debug(status);
            }
            beforeLoc = player.getLocalLocation();
        }
    }
}`
});