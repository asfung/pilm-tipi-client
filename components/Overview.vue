<template>
  <div>
    <div class="flex justify-center">
      <v-row justify="center">
        <v-col cols="auto">
          <div class="text-center">
            <v-img @click="null" href="www.google.com" :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              height="535px" width="350px" cover></v-img>
          </div>
        </v-col>
        <v-col cols="auto">
          <div class="text-center">
            <div class="max-w-screen-md text-start mb-4">
              <h1 class="text-3xl mb-2">Storyline</h1>
              <p>{{ item.overview ? item.overview : '' }}</p>
            </div>

            <v-row no-gutters class="text-left">

              <v-col>
                <!-- <p class="text-blue-700">Released <span class="text-white">{{ item.release_date }}</span></p> -->
                <v-row class="text-left w-8/12">
                  <v-col>
                    <p class="text-blue-800 font-semibold">Released</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.release_date ? item.release_date : item.first_air_date  }}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-col>
                <v-row class="text-left w-8/12">
                  <v-col>
                    <p class="text-blue-800 font-semibold">Status</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.status ? item.status : '' }}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-col v-if="formattedBudget">
                <v-row class="text-left w-8/12">
                  <v-col class="text-blue-800 font-semibold">
                    <p>Budget</p>
                  </v-col>
                  <v-col>
                    <p>{{ formattedBudget ? formattedBudget : ''}}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-responsive width="100%"></v-responsive>

              <v-col v-if="formattedRuntime">
                <v-row class="text-left w-8/12">
                  <v-col class="text-blue-800 font-semibold">
                    <p>Runtime</p>
                  </v-col>
                  <v-col>
                    <p>{{ formattedRuntime ? formattedRuntime : '' }}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-col>
                <v-row class="text-left w-8/12">
                  <v-col>
                    <p class="text-blue-800 font-semibold">Genre</p>
                  </v-col>
                  <v-col>
                    <p v-for="(genre, index) in item.genres" :key="index">{{ genre.name }}</p>
                  </v-col>
                </v-row>
              </v-col>


              <v-responsive width="100%"></v-responsive>

              <v-col v-if="formattedRevenue">
                <v-row class="text-left w-8/12">
                  <v-col class="text-blue-800 font-semibold">
                    <p>Revenue</p>
                  </v-col>
                  <v-col>
                    <p>{{ formattedRevenue ? formattedRevenue : '' }}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-col v-if="formattedBudget">
                <v-row class="text-left w-8/12">
                  <v-col class="text-blue-800 font-semibold">
                    <p>Budget</p>
                  </v-col>
                  <v-col>
                    <p>{{ formattedBudget ? formattedBudget : ''}}</p>
                  </v-col>
                </v-row>
              </v-col>

              <v-responsive width="100%"></v-responsive>

              <v-col>
                <v-row class="text-left w-4/12">
                  <v-col class="text-blue-800 font-semibold">
                    <p>Productions</p>
                  </v-col>
                  <v-col>
                    <p class="max-w-32">{{ formattedProductionCompanies ? formattedProductionCompanies : formattedProductionCompanies }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-slide-group class="pa-2 mt-9" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="(cast, index) in item.credits.cast" :key="index">
          <CastItem :cast="cast" />
        </v-slide-group-item>
      </v-slide-group>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    formattedRuntime() {
      if (this.type === 'movie') {
        const totalMinutes = this.item.runtime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
      }
    },
    formattedRevenue() {
      if (this.type === 'movie') {
        const revenue = this.item.revenue;
        return `$${revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      }
    },
    formattedBudget() {
      if (this.type === 'movie') {
        const revenue = this.item.budget;
        return `$${revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      }
    },
    formattedProductionCompanies() {
      if (this.type === 'movie') {
        const companies = this.item.production_companies;
        return companies.map(company => company.name).join(', ');
      }
      if (this.type === 'tv' && this.item.production_companies) {
        const companies = this.item.production_companies;
        return companies.map(company => company.name).join(', ');
      }
    },
  },
  props: {
    item: {
      // type: Object,
      // required: true, // Ensure item is passed as a prop
    },
    type: {
    },
  },
}
</script>
