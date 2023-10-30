<div v-if="login_modal" id="default-modal" tabindex="-1"
class=" fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0
                                                                                                                                                                                                                                                                                                                                                                                      h-[calc(100%-1rem)] max-h-full absolute ">
<div class=" relative w-full max-w-2xl max-h-full">
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    <!-- Modal header -->
    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Vous devez vous connecter pour sauvegarder vos couleurs
      </h3>
      <button type="button" @click="login_modal = false"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="default-modal">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <!-- Modal body -->
<div class="p-6 space-y-6">
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Nos services sont gratuits et ne nécessitent pas de compte pour être utilisés. Cependant, si vous
        souhaitez sauvegarder vos couleurs, vous devez vous connecter.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Vos données ne seront pas utilisées à des fins commerciales.
      </p>
    </div>
    <!-- Modal footer -->
<div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
      <a data-modal-hide="default-modal" type="button" href="/auth"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Me connecter
      </a>
    </div>
  </div>
</div>
</div>