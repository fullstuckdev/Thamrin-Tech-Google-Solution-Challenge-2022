<template>
    <div id="app" class="container mt-5">
    <b-form @submit.prevent="handleFormSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Street">
            <b-form-input v-model="formData.street"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group label="City">
            <b-form-input v-model="formData.city"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="State">
            <b-form-input v-model="formData.state"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Zip">
            <b-form-input v-model="formData.zip"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
          <b-row>
        <b-col md="6">
          <b-form-group label="Community Name">
            <b-form-input v-model="formData.community"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
<br>
<div class="map">
    <GMapMap
      :center="{lat:39, lng:-95}"
      :zoom="4"
      map-type-id="roadmap">
      <div v-if="savedLocations.length > 0">
        <GMapMarker
          :key="index"
          v-for="(l, index) in savedLocations"
          :position="{lat: l.geoPoint.latitude, lng: l.geoPoint.longitude}"
        />
      </div>
    </GMapMap>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { projectFirestore } from "../main";
export default {
  data: () => ({
    savedLocations: [],
    formData: {
      street: "",
      city: "",
      state: "",
      zip: "",
      community: "",
    },
  }),
  async beforeMount() {
    const snap = await projectFirestore.collection("locations").get();

    snap.docs.forEach((doc) => {
      this.savedLocations.push(doc.data());
    });
  },
  methods: {
    async handleFormSubmit() {
      if (
        !this.formData.street ||
        !this.formData.city ||
        !this.formData.state ||
        !this.formData.zip ||
        !this.formData.community
      ) {
        alert("You must add a full address!");
        return;
      }

      let address = `${this.formData.street}, ${this.formData.city}, ${this.formData.state} ${this.formData.zip}, ${this.formData.community}`;
      let { data } = await axios.post(
        "https://us-central1-thamrintech-dfb7f.cloudfunctions.net/geocodeAddressAndSave",
        {
          address: address,
        }
      );

      if (data === "No Results") {
        alert("No results for address");
        return;
      }

      let obj = {
        address: data.address,
        geoPoint: {
          latitude: data.geoPoint._latitude,
          longitude: data.geoPoint._longitude,
        },
      };

      this.savedLocations.push(obj);

      this.formData.street = "";
      this.formData.city = "";
      this.formData.state = "";
      this.formData.zip = "";
      this.formData.community = "";
    },
  },
}
</script>

<style>

</style>
