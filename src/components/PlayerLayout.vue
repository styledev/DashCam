<template>
	<div class="container">
		<div class="team team--blue">
			<div class="team__players team__players--blue">
				<new-player-tab
					v-for="(item, index) in blueTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
			<div class="team__logo">
				<img src="https://dashleague.games/wp-content/uploads/2021/01/team-hhi-256x256@2x.png" width="94" height="94">
			</div>
		</div>
		
		<div class="team team--red">
			<div class="team__logo">
				<img src="https://dashleague.games/wp-content/uploads/2021/01/team-unsc-256x256@2x.png" width="94" height="94">
			</div>
			<div class="team__players team__players--red">
				<new-player-tab
					v-for="(item, index) in redTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
		</div>
		
		<div class="scoreboard">
			<div class="scoreboard__wrapper">
				<div class="scoreboard__name scoreboard__name--blue">BLUE</div>
				<div class="scoreboard__score scoreboard__score--blue">###</div>
				
				<div class="scoreboard__name scoreboard__name--red">RED</div>
				<div class="scoreboard__score scoreboard__score--red">###</div>
				
				<div class="scoreboard__time">00:00</div>
			</div>
		</div>
		
		<mini-map />
		
		<div class="playerBar">
			<div class="playerBar_wrapper">
				<div class="playerBar__dashes">=====</div>
				<div class="playerBar__score">24,523</div>
				<div class="playerBar__health">=====</div>
				<div class="playerBar__kills">104</div>
				<div class="playerBar__name">UNSC Styledev</div>
				<div class="playerBar__deaths">54</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import playerInfo from "../models/playerInfo";
import NewPlayerTab from "./NewPlayerTab.vue";
import MiniMap from "./MiniMap.vue";

export default defineComponent({
		name:"PlayerLayout",
		components: {
		NewPlayerTab,
		MiniMap,
	},

	computed: mapState({
		redTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 0;
			});
		},
		blueTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 1;
			});
		},
	}),
});
</script>

<style scoped>
.container{display:grid;height:100vh;grid-template-columns:538px auto 538px;grid-template-rows:1fr 1fr;text-align:center;}

.team{
	color: rgba(255,255,255,0.95);
	display: grid;
	grid-template-rows:20px 17px 77px auto;
	height: 231px;
	width: 538px;
}
.team__logo{grid-row:2 / span 2;}

.team--blue{
	background: transparent url('../../public/assets/dln-ui-team-blue.png') no-repeat scroll top left;
	grid-template-columns:20px auto 94px;
}
.team--blue .team__logo{grid-column:3;}
.team--red{
	background: transparent url('../../public/assets/dln-ui-team-red.png') no-repeat scroll top right;
	grid-template-columns:94px auto 20px;
}
.team--red .team__logo{grid-column:1;}

.team__players {
	display: grid;
	grid-row:3;
	grid-template-columns: repeat(1,1fr);
	grid-template-rows: repeat(5,1fr);
	row-gap: 8px;
	height: 150px;
	width: 402px;
}
.team__players--blue{grid-column:2;}
.team__players--red{justify-self:end;}

.scoreboard{display:flex;grid-column:2;grid-row:1;justify-content:center;}
.scoreboard__wrapper {
	background: transparent url('../../public/assets/dln-ui-scoreboard.png') no-repeat scroll 0 0;
	color: #fff;
	display: grid;
	grid-column-start: 2;
	grid-template-columns: 122px 12px 70px 7px 105px 71px 12px auto;
	grid-template-rows: 17px 9px 29px 11px 4px auto;
	height: 106px;
	margin-top: 1em;
	width: 523px;
}
.scoreboard__wrapper > div{align-items:center;display:flex;justify-content:center;}
.scoreboard__name{font-size:30px;font-weight:800;grid-row:3 / span 3;}
.scoreboard__name--blue{grid-column:1;}
.scoreboard__name--red{grid-column:-2;}
.scoreboard__score{font-size:24px;font-weight:700;grid-row:2 / span 2;}
.scoreboard__score--blue{grid-column:3 / span 2;}
.scoreboard__score--red{grid-column:6;}
.scoreboard__time{font-size:30px;font-weight:800;grid-column:4 / span 2;grid-row:5 / span 2;text-align:center;}

#minimap{grid-row-start:-1;}

.playerBar {
	align-items: end;
	display: flex;
	grid-column: 2;
	grid-row: -1;
	justify-content: center;
	margin-bottom: 1em;
}
.playerBar_wrapper {
	background: transparent url('../../public/assets/dln-ui-player-bar.png') no-repeat scroll 0 0;
	color: #fff;
	display: grid;
	grid-template-columns: 42px 8px 40px 3px 83px 15px 140px 13px 84px 3px 40px 8px auto;
	grid-template-rows: 7px 23px 6px 7px 8px 30px 8px 3px;
	height: 93px;
	width: 523px;
}
.playerBar_wrapper > div{align-items:center;display:flex;justify-content:center;}
.playerBar__dashes{grid-column:3 / span 3;grid-row:2;}
.playerBar__score{font-size:24px;font-weight:700;grid-column:7;grid-row:2 / span 3;}
.playerBar__health{grid-column:9 / span 2;grid-row:2;}
.playerBar__kills{font-size:24px;font-weight:700;grid-column:2 / span 2;grid-row:4 / span 3;}
.playerBar__deaths{font-size:24px;font-weight:700;grid-column:11 / span 2;grid-row:4 / span 3;}
.playerBar__name{font-size:30px;font-weight:800;grid-column:4 / span 6;grid-row:6 / span 2;}
</style>