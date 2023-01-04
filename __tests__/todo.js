const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("To do list test suits", () => {
    beforeAll(() => {
        const todayDate = new Date();
        const oneDay = 86400 * 1000;
        const lastDate = new Date(todayDate.getTime() - 1 * oneDay);
        const nextDate = new Date(todayDate.getTime() + 1 * oneDay);

        const today = todayDate.toLocaleDateString("en-CA");
        const lastday = lastDate.toLocaleDateString("en-CA");
        const nextDay = nextDate.toLocaleDateString("en-CA");

        add({
            title: "Sessionals",
            dueDate: lastday,
            completed: false,
        });
        add({
            title: "Late Fee Pending",
            dueDate: today,
            completed: true,
        });
        add({ 
            title: "Random job", 
            dueDate: nextDay, 
            completed: true 
        });
        add({ 
            title: "DSA", 
            dueDate: nextDay, 
            completed: false 
        });
       
    });
    test("should add new todo", () => {
        const todoItemCount = all.length;
        add({
            title: "Pata Nahi",
            completed: false,
            dueDate: new Date().toLocaleDateString("en-CA"),
        });
        expect(all.length).toBe(todoItemCount + 1);
    });
    test("Should markAsComplete", () => {
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });
    test("Overdue items", () => {
        const today = new Date();
        const oneDay = 86400 * 1000;
        const oldOverdueItems = overdue();
        add({
            title: "Overdue",
            completed: true,
            dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
                "en-CA"
            ),
        });
        const overdueItems = overdue();
        expect(overdueItems.length).toBe(oldOverdueItems.length + 1);
    });

    test("Due today items", () => {
        const today = new Date();
        const oldTodaysItems = dueToday();
        add({
            title: "Today",
            completed: false,
            dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
        });
        const todayItems = dueToday();
        expect(todayItems.length).toBe(oldTodaysItems.length + 1);
    });

    test("Due later items", () => {
        const today = new Date();
        const oneDay = 86400 * 1000;
        const oldDueLaterItems = dueLater();
        add({
            title: "Later",
            completed: true,
            dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
                "en-CA"
            ),
        });
        const dueLaterItems = dueLater();
        expect(dueLaterItems.length).toBe(oldDueLaterItems.length + 1);
    });
});