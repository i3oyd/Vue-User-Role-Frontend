<template>
    <nav class="flex items-center justify-between flex-wrap bg-gradient-to-r from-indigo-800 via-indigo-700 to-teal-600 p-4 w-full top-0 z-10">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<router-link class="text-white no-underline hover:text-white hover:no-underline" to="/">
				<span class="text-2xl pl-2"><i class="em em-grinning"></i>Dashboard | </span>
			</router-link>
            <router-link class="inline-block text-indigo-100 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/users">Users</router-link>
		</div>

		<div class="block lg:hidden">
			<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>

		<div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
			<ul class="list-reset lg:flex justify-end flex-1 items-center">
				<li class="mr-3">
					<h3 class="inline-block py-2 px-4 text-white no-underline">Jam Nash</h3>
				</li>
				<li class="mr-3">
					<router-link class="inline-block text-indigo-100 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/logout">Logout</router-link>
				</li>
				<!-- <li class="mr-3">
					<router-link class="inline-block text-indigo-100 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" to="/">Welcome</router-link>
				</li> -->
			</ul>
		</div>
	</nav>
</template>