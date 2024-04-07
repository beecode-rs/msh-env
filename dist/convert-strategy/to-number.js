export class ConvertStrategyToNumber {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        const convertedValue = Number(str);
        if (isNaN(convertedValue)) {
            throw new Error(`"${str}" is not a number`);
        }
        return convertedValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tbnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnZlcnQtc3RyYXRlZ3kvdG8tbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyx1QkFBdUI7SUFDbkMsT0FBTyxDQUFDLEdBQVk7UUFDbkIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkIsT0FBTyxTQUFTLENBQUE7UUFDakIsQ0FBQztRQUNELElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sU0FBUyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFFRCxPQUFPLGNBQWMsQ0FBQTtJQUN0QixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3kgfSBmcm9tICcjc3JjL2NvbnZlcnQtc3RyYXRlZ3knXG5cbmV4cG9ydCBjbGFzcyBDb252ZXJ0U3RyYXRlZ3lUb051bWJlciBpbXBsZW1lbnRzIENvbnZlcnRTdHJhdGVneTxudW1iZXI+IHtcblx0Y29udmVydChzdHI/OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuXHRcdGlmIChzdHIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdH1cblx0XHRpZiAoc3RyLnRyaW0oKSA9PT0gJycpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdFx0Y29uc3QgY29udmVydGVkVmFsdWUgPSBOdW1iZXIoc3RyKVxuXHRcdGlmIChpc05hTihjb252ZXJ0ZWRWYWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgXCIke3N0cn1cIiBpcyBub3QgYSBudW1iZXJgKVxuXHRcdH1cblxuXHRcdHJldHVybiBjb252ZXJ0ZWRWYWx1ZVxuXHR9XG59XG4iXX0=