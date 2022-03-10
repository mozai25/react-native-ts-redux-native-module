
interface Item {
    title: String;
    items: []
}

export class Poster {

    poster: any;
    listItems: any[] = [];

    constructor(poster: any) {
        this.poster = poster
    }

    async getPosterData () : Promise<Poster> {

       const result = await fetch("https://raw.githubusercontent.com/24i/smartapps-test/main/data.json");
       const items = await result.json();

       return new Poster(items);
    }

    adjustPosterData () : any[] {

        if (this.poster != null) {
            this.poster.carousels.map((item: Item, index: any) => {
                let i = {
                    title: item.title,
                    data: item.items
                }
                this.listItems.push(i);
            })
        }
        return this.listItems;
    }

}