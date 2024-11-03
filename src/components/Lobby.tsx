import { useEffect, useState } from "react";
import { Users, Gamepad2, Palette, Crown } from "lucide-react";
import { Button } from "./Button";
import { Label } from "./Label";
import { Input } from "./Input";
import { Select } from "./Select";
import {
  usePlayersList,
  myPlayer,
  isHost,
  useMultiplayerState,
  usePlayerState,
  useIsHost,
} from "playroomkit";

const GAME_TYPES = ["Capture the Flag", "Hide and Seek", "Free for All"];
export const Lobby = () => {
  const players = usePlayersList(true);
  const [username, setUsername] = usePlayerState(
    myPlayer(),
    "username",
    "Joueur-" + usePlayersList().length
  );
  const [color, setColor] = usePlayerState(myPlayer(), "color", "#ff0000");
  const [gameType, setGameType] = useMultiplayerState(
    "gameType",
    GAME_TYPES[0]
  );
  const [host, setHost] = useMultiplayerState("host", (isHost() ? myPlayer().id : ""))
  const [isReady, setIsReady] = useState<boolean>(false);

  console.log(myPlayer().id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { gameType, isReady });
  };

  useEffect(() => {
    setUsername(username.replace(/[\s]|[^a-zA-Z0-9-]|(^-|--)/g, ""));
  }, [username]);

  useEffect(() => {
    myPlayer().setState("isReady", isReady);
  }, [isReady]);

  useEffect(() => {
    if (isHost()) {
      setHost(myPlayer().id)
    }
  }, [useIsHost()])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Gamepad2 className="mr-2" />
          Multiplayer Game Lobby
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                maxLength={16}
                className="bg-gray-700 text-white border border-gray-600"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label htmlFor="color">Player Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-12 bg-gray-700 border border-gray-600"
                />
                <span>{color}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="gameType">Game Type</Label>
              <Select
                options={GAME_TYPES}
                value={gameType}
                onChange={setGameType}
                blocked={!isHost()}
              />
            </div>

            <Button isReady={isReady} onClick={() => setIsReady(!isReady)}>
              {isReady ? "Ready!" : "Set Ready"}
            </Button>
          </form>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" />
              Players in Lobby
            </h2>
            <ul className="space-y-2">
              {players.reverse().map((player) => (
                <li
                  key={player.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-6 w-7 border-white border-solid border-2 rounded"
                      style={{ background: player.getState("color") }}
                    />
                    <span>{player.getState("username")}</span>
                    {(host === player.id) && <Crown className="ml-1 text-yellow-500" />}
                  </div>
                  <span
                    className={`px-2 py-1 rounded ${
                      player.getState("isReady")
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {player.getState("isReady") ? "Ready" : "Not Ready"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
