<template>
	<form class="form-wrapper" @submit.prevent="type === 'login' ? $emit('submited', email, password) : $emit('submited', nick, email, password, gender)">
		<header class="title">
			{{type === 'login' ? 'Logowanie' : 'Rejestracja'}}
		</header>
		<div class="input-divs">
			<div class="input-div" v-if="type === 'register'">
				<input
					class="input"
					type="text"
					placeholder=" "
					pattern="^.{3,}$"
					required
					v-model="nick"
				/>
				<label class="label">
					<fa-icon icon="signature" class="icon" />
					Nick
				</label>
			</div>
			<div class="input-div">
				<input
					class="input"
					type="text"
					placeholder=" "
					pattern="^\S+@\S+\.\S+$"
					required
					v-model="email"
				/>
				<label class="label">
					<fa-icon icon="user" class="icon" />
					Login
				</label>
			</div>
			<div class="input-div">
				<input
					class="input"
					type="password"
					placeholder=" "
					pattern="^.{6,}$"
					required
					v-model="password"
				/>
				<label class="label">
					<fa-icon icon="lock" class="icon" />
					Hasło
				</label>
			</div>
			<div class="gender-choise" v-if="type === 'register'">
				<div class="gender">
					<label class="custom-checkbox">
						<input
							type="checkbox"
							:checked="gender === 'male'"
							@click="() => {gender !== 'male' ? gender = 'male' : gender = ''}"
						/>
						<span class="checkmark"></span>
					</label>
					<fa-icon icon="male" class="gender-icon" />
				</div>
				<div class="gender">
					<label class="custom-checkbox">
						<input
							type="checkbox"
							:checked="gender === 'female'"
							@click="() => {gender !== 'female' ? gender = 'female' : gender = ''}"
						/>
						<span class="checkmark"></span>
					</label>
					<fa-icon icon="female" class="gender-icon" />
				</div>
				
			</div>
			<router-link v-if="type === 'login'" to="/login" class="forgotten">Zapomniałeś hasła?</router-link>
			<div v-if="error" class="error">
				{{error.code === 'auth/email-already-in-use' ? 'Podany adres e-mail jest już używany!' : error.message}}
			</div>
		</div>
		<div class="submit-div">
			<button type="submit" class="button">{{type === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}}</button>
			<div class="registration">
				{{type === 'login' ? 'Nie masz jeszce konta?' : 'Masz już konto?'}}
				<router-link :to="type === 'login' ? '/register' : '/login'" class="registration-link">{{type === 'login' ? 'Zarejestruj się' : 'Zaloguj się'}}</router-link>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: "Form",
		props: {
			type: String,
			error: Object
		},
		data() {
			return {
				email: '',
				password: '',
				nick: '',
				gender: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		.title {
			display: none;
			margin: 20px 0;
			font-size: 35px;
			font-weight: bold;
			letter-spacing: 1px;
			&::first-letter {
				color: $decorative;
			}
			@media (min-height: 350px) {
				display: block;
			}
		}
		.input-divs {
			width: 100%;
			max-width: 400px;
			.input-div {
				position: relative;
				margin: 10px 0;
				.input {
					width: 100%;
					&:focus,
					&:not(:placeholder-shown) {
						~ .label {
							top: -5px;
							left: -5px;
							transform: scale(0.8);
						}
					}
					&:valid {
						~ .label::after {
							content: '\f00c';
							font-family: FontAwesome;
							color: $decorative;
							margin-left: 5px;
						}
					}
				}
				.label {
					position: absolute;
					top: 20px;
					left: 10px;
					color: $primary;
					z-index: -1;
					transition: all 0.2s ease;
					.icon {
						margin-right: 3px;
					}
				}
			}
		}
		.gender-choise {
			display: flex;
			justify-content: center;
			margin: 20px 0;
			.gender {
				display: flex;
				align-items: center;
				margin: 0 20px;
				.gender-icon {
					font-size: 30px;
				}
			}
			.custom-checkbox {
				display: block;
				min-width: 25px;
				height: 25px;
				margin-right: 10px;
				cursor: pointer;
				.checkmark {
					position: relative;
					width: 100%;
					height: 100%;
					border: 2px solid $decorative;
					display: inline-block;
					border-radius: 5px;
					transition: all 0.2s ease;
					&::before {
						content: '\f00c';
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%) scale(0.5) rotate(50deg);
						font-family: "FontAwesome";
						color: $black;
						opacity: 0;
						transition: all 0.2s 0.1s ease;
					}
				}
				input {
					display: none;
					&:checked {
						& + .checkmark {
							background-color: $decorative;
							&::before {
								transform: translate(-50%, -50%) scale(1) rotate(0);
								opacity: 1;
							}
						}
					}
				}
			}
		}
		.forgotten {
			color: $secondary;
			text-decoration: none;
			transition: all 0.2s ease;
			&:hover {
				color: $primary;
			}
		}
		.error {
			color: $wrong
		}
		.button {
			display: none;
			position: relative;
			font-size: 20px;
			padding: 15px 20px;
			margin: 30px 0;
			background-color: transparent;
			border-radius: 30px;
			border: 2px solid $decorative;
			color: $primary;
			letter-spacing: 1px;
			transition: background-color 0.5s ease, transform 0.2s ease;
			overflow: hidden;
			outline: none;
			&::before {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: $decorative;
				opacity: 0.5;
				filter: blur(5px);
				transform: translateX(-200px) skewX(-15deg);
				transition: all 0.7s ease;
				z-index: 2;
			}
			&:hover {
				cursor: pointer;
				background-color: $decorative;
				color: $bg;
				&::before {
					transform: translate(200px) skewX(-15deg);
					opacity: 0.6;
					transition: all 0.7s ease;
				}
			}
			&:active{
				transform: scale(0.95);
			}
			@media (min-height: 300px) {
				display: block;
			}
		}
		.submit-div {
			display: flex;
			flex-direction: column;
			align-items: center;
			.registration {
				color: $secondary;
				.registration-link {
					/* display: block; */
					color: $decorative;
					text-decoration: none;
					font-weight: bold;
				}
			}
		}
	}
</style>