<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h5 slot="header" class="title">Listas de Compras</h5>
        <form @submit.prevent="addList">
          <div class="row">
            <div class="col-md-10">
              <base-input label="Nome da Lista" v-model="newList.name" placeholder="Minha Lista" />
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <base-button type="primary" native-type="submit" fill>Adicionar</base-button>
            </div>
          </div>
        </form>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="text-primary">
              <tr>
                <th>Lista</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in lists" :key="index">
                <td>
                  <router-link :to="`/lists/${index}`">{{ list.name }}</router-link>
                </td>
                <td class="text-right">
                  <base-button size="sm" type="danger" @click="removeList(index)">Remover</base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingLists",
  data() {
    return {
      newList: { name: "" },
      lists: JSON.parse(localStorage.getItem("lists") || "[]"),
    };
  },
  methods: {
    addList() {
      if (!this.newList.name.trim()) return;
      this.lists.push({ name: this.newList.name.trim(), items: [] });
      this.save();
      this.newList.name = "";
    },
    removeList(index) {
      this.lists.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

