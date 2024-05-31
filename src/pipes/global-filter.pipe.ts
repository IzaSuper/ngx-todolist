import {Pipe, PipeTransform} from "@angular/core";
import {Item} from "../app/interface/item";

@Pipe({
  standalone: true,
  name: 'globalFilter'
})
export class globalFilterPipe implements PipeTransform {

  transform(items: Item[], searchText: string): Item[] {
    const lowerCaseValue = searchText.toLowerCase()
    if (!lowerCaseValue) {
      return items
    }
    return items.filter(item =>
      item.title.toLowerCase().includes(lowerCaseValue) ||
      item.description.toLowerCase().includes(lowerCaseValue)
    )
    }
  }
