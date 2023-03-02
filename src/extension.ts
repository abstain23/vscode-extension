import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('插件已经激活～');
	const currentEditor = vscode.window.activeTextEditor
	const currentSelect = currentEditor?.document.getText(currentEditor.selection)
	let disposable = vscode.commands.registerCommand('vscode-extension.helloWorld', () => {
		
		vscode.window.showErrorMessage(currentSelect||"hello");
	});

	vscode.languages.registerHoverProvider("*", {
		provideHover: async (document, position) => {
			const word = document.getText(document.getWordRangeAtPosition(position))
			const result = "cc: " + word
			return new vscode.Hover(result)
		}
	})

	let showTime = vscode.commands.registerCommand('vscode-extension.showTime', () => {
		let day = new Date()
		day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
		let date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" +day.getDate();
		vscode.window.showInformationMessage(date);
	})

	let progress = vscode.commands.registerCommand("vscode-extension.progress", () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: 'loading...',
			cancellable: true
		}, (progress) => {
			progress.report({increment: 0})
			let increment = 0
			const id = setInterval(() => {
				increment += 10
				progress.report({increment, message: 'quick...'})
				if(increment === 50) {
					clearInterval(id)
				}
			}, 1000)

			return new Promise(r => {
				setTimeout(() => {
					r(1)
				}, 5500)
			})
		})
	})

	let showError = vscode.commands.registerCommand("vscode-extension.showError", () => {
		// vscode
	})

	context.subscriptions.push(disposable, showTime, progress, showError);
}


export function deactivate() {}
