<template>
	<div id="minimap"></div>
</template>

<style>
  #minimap{
    
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";
import * as PIXI from "pixi.js";
import store from "../store/store";
import playerJoins from "../models/HyperBashModels/playerJoins";

export default defineComponent({
	data() {
		return {
			app: new PIXI.Application({
				backgroundAlpha: 1.0,
				width: 400,
				height: 400,
			}),
			world: new PIXI.Container(),
			playerContainer: new PIXI.Container(),
			players: [] as PIXI.Graphics[],
			dragging: false,
		};
	},

	mounted() {
		var c = document.getElementById("minimap") as HTMLCanvasElement;
		c.appendChild(this.app.view);

		this.app.stage.addChild(this.world as PIXI.Container);

		this.world.position.set(this.app.view.width / 2, this.app.view.height / 2);
		this.world.addChild(this.playerContainer as PIXI.Container);

		store.subscribe((mutation, state) => {
			switch (mutation.type) {
				case "playerPos":
					this.updatePlayerPos();
					break;
				case "playerJoins":
					this.addPlayer(mutation.payload);
					break;
				case "playerLeaves":
					this.removePlayer(mutation.payload);
					break;
			}
		});

		this.app.view.addEventListener("pointermove", (e) => {
			if(this.dragging == false) return;
			this.world.position.set(
				this.world.position.x + e.movementX,
				this.world.position.y + e.movementY
			);
		});
		this.app.view.addEventListener("pointerdown",()=>{
			this.dragging = true;
		})
		this.app.view.addEventListener("pointerup",()=>{
			this.dragging = false;
		})
	},

	methods: {
		addPlayer(playerJoined: playerJoins) {
			let newPlayer = new PIXI.Graphics();
			this.world.addChild(newPlayer);
			newPlayer.beginFill(playerJoined.team ? 0x0000ff : 0xff0000);
			newPlayer.moveTo(0, -60);
			newPlayer.lineTo(30, 0);
			newPlayer.lineTo(-30, 0);
			newPlayer.lineTo(0, -60);
			newPlayer.endFill();
			this.players.push(newPlayer);

			this.playerContainer.addChild(newPlayer);
		},

		removePlayer(playerLeaves: any) {
			this.playerContainer.removeChildAt(playerLeaves.spectatorIndex);
			this.players.splice(playerLeaves.spectatorIndex, 1);
		},

		updatePlayerPos() {
			for (let i = 0; i < this.$store.state.PlayerData.length; i++) {
				this.players[i].position.set(
					this.$store.state.PlayerData[i].feetPosition.X,
					this.$store.state.PlayerData[i].feetPosition.Z
				);
				this.players[i].angle = this.$store.state.PlayerData[i].feetRotation;
			}
		},
	},

	computed: {},
});
</script>

<style scoped></style>
