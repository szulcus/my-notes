<template>
	<form class="form-wrapper" @submit.prevent="type === 'login' ? $emit('submited', email, password) : $emit('submited', nick, email, password, gender)">
		<header class="title">
			{{$t(`forms.${type}.title`)}}
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
					{{$t(`forms.${type}.inputs.nick`)}}
				</label>
			</div>
			<div class="input-div">
				<input
					class="input"
					type="email"
					placeholder=" "
					pattern="^\S+@\S+\.\S+$"
					required
					v-model="email"
				/>
				<label class="label">
					<fa-icon icon="user" class="icon" />
					{{$t(`forms.${type}.inputs.login`)}}
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
					{{$t(`forms.${type}.inputs.password`)}}
				</label>
			</div>
			<div class="gender-choise" v-if="type === 'register'">
				<div class="gender">
					<Checkbox
						:checked="gender === 'male'"
						@clicked="() => {gender !== 'male' ? gender = 'male' : gender = ''}"
					/>
					<fa-icon icon="male" class="gender-icon" />
				</div>
				<div class="gender">
					<Checkbox
						:checked="gender === 'female'"
						@clicked="() => {gender !== 'female' ? gender = 'female' : gender = ''}"
					/>
					<fa-icon icon="female" class="gender-icon" />
				</div>
				
			</div>
			<router-link v-if="type === 'login'" :to="{name: 'Login'}" class="forgotten">{{$t(`forms.${type}.forgotPassword`)}}</router-link>
			<div v-if="error" class="error">
				{{ Object.keys($t(`forms.errors`)).includes(error.code) ? $t(`forms.errors.${error.code}`) : error.message }}
				<!-- {{error.code === 'auth/email-already-in-use' ? 'Podany adres e-mail jest już używany!' : error.message}} -->
			</div>
		</div>
		<div class="submit-div">
			<Button type="submit" :content="$t(`forms.${type}.submit`)" />
			<div class="registration">
				{{$t(`forms.${type}.question.content`)}}
				<router-link :to="{name: $t(`forms.${type}.question.link.to`)}" class="registration-link">{{$t(`forms.${type}.question.link.content`)}}</router-link>
			</div>
		</div>
	</form>
</template>

<script>
	import Button from '@/Components/Global/Button.vue'
	import Checkbox from '@/Components/Global/Checkbox.vue'
	export default {
		name: "Form",
		components: {
			Button,
			Checkbox
		},
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
				color: var(--decorative);
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
							color: var(--decorative);
							margin-left: 5px;
						}
					}
				}
				.label {
					position: absolute;
					top: 20px;
					left: 10px;
					color: var(--primary);
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
		}
		.forgotten {
			display: block;
			color: var(--secondary);
			text-decoration: none;
			transition: all 0.2s ease;
			margin-bottom: 10px;
			&:hover {
				color: var(--primary);
			}
		}
		.error {
			color: var(--wrong)
		}
		.submit-div {
			display: flex;
			flex-direction: column;
			align-items: center;
			.registration {
				color: var(--secondary);
				.registration-link {
					/* display: block; */
					color: var(--decorative);
					text-decoration: none;
					font-weight: bold;
				}
			}
		}
	}
</style>