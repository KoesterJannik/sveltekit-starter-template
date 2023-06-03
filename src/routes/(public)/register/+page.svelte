<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { page } from '$app/stores';
	export let data: PageData;

	// Client API:
	const { form, errors, constraints, message } = superForm(data.form);
</script>

<form method="POST">
	<label for="email">E-mail</label>
	<input type="email" name="email" bind:value={$form.email} {...$constraints.email} />
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	<label for="password">Password</label>
	<input type="text" name="password" bind:value={$form.password} {...$constraints.password} />
	{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

	<div><button>Register</button></div>
</form>
{#if $page.status >= 400}
	<h3 class:invalid={$page.status >= 400}>User already exist</h3>
{/if}
{#if message}
	<h3>{$message}</h3>
{/if}

<SuperDebug data={$form} />

<style>
	.invalid {
		color: red;
	}
</style>
