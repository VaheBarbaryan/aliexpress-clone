<script setup>
import { reactive, watchEffect } from "vue"
import { useUserStore } from "@/stores/user"

import MainLayout from "@/layouts/MainLayout.vue"

const userStore = useUserStore()
const user = useSupabaseUser()

const form = reactive({
  contactName: null,
  address: null,
  zipCode: null,
  city: null,
  country: null,
  currentAddress: null,
  loading: false,
  isUpdate: false,
  error: null,
})

const onSubmit = async () => {
  form.loading = true
  form.error = null

  if (!form.contactName) {
    form.error = { type: "contactName", message: "A contact name is required" }
  } else if (!form.address) {
    form.error = { type: "address", message: "An address name is required" }
  } else if (!form.zipCode) {
    form.error = { type: "zipCode", message: "A zip code name is required" }
  } else if (!form.city) {
    form.error = { type: "city", message: "A city code name is required" }
  } else if (!form.country) {
    form.error = {
      type: "country",
      message: "A country code name is required",
    }
  }

  if (form.error) {
    form.loading = false
    return
  }

  if (form.isUpdate) {
    await useFetch(
      `/api/prisma/update-address/${form.currentAddress.data.id}`,
      {
        method: "PATCH",
        body: {
          userId: user.value.id,
          name: form.contactName,
          address: form.address,
          zipCode: form.zipCode,
          city: form.city,
          country: form.country,
        },
      }
    )

    form.loading = false

    return navigateTo("/checkout")
  }

  await useFetch(`/api/prisma/add-address`, {
    method: "POST",
    body: {
      userId: user.value.id,
      name: form.contactName,
      address: form.address,
      zipCode: form.zipCode,
      city: form.city,
      country: form.country,
    },
  })
}

watchEffect(async () => {
  form.currentAddress = await useFetch(
    `/api/prisma/get-address-by-user/${user.value.id}`
  )

  if (form.currentAddress.data) {
    const { data } = form.currentAddress.data
    form.contactName = data.name
    form.address = data.address
    form.zipCode = data.zipcode
    form.city = data.city
    form.country = data.country
  }
  userStore.setLoading(false)
})
</script>

<template>
  <main-layout>
    <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl text-bold mb-2">Address Details</div>

        <form @submit.prevent="onSubmit">
          <text-input
            class="w-full mt-2"
            placeholder="Contact Name"
            v-model:input="form.contactName"
            type="text"
            :error="
              form.error && form.error.type === 'contactName'
                ? form.error.message
                : ''
            "
          />
          <text-input
            class="w-full mt-2"
            placeholder="Address"
            v-model:input="form.address"
            type="text"
            :error="
              form.error && form.error.type === 'address'
                ? form.error.message
                : ''
            "
          />
          <text-input
            class="w-full mt-2"
            placeholder="Zip Code"
            v-model:input="form.zipCode"
            type="text"
            :error="
              form.error && form.error.type === 'zipCode'
                ? form.error.message
                : ''
            "
          />
          <text-input
            class="w-full mt-2"
            placeholder="City"
            v-model:input="form.city"
            type="text"
            :error="
              form.error && form.error.type === 'city' ? form.error.message : ''
            "
          />
          <text-input
            class="w-full mt-2"
            placeholder="Country"
            v-model:input="form.country"
            type="text"
            :error="
              form.error && form.error.type === 'country'
                ? form.error.message
                : ''
            "
          />

          <button
            :disabled="form.loading"
            type="submit"
            class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!form.loading">Update Address</div>
            <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
          </button>
        </form>
      </div>
    </div>
  </main-layout>
</template>
