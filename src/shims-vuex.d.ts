import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";

export interface State {
	PlayerData: playerInfo[];
	connection: string;
	selectedIndex: number;
}

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
