import { Component } from 'react'
import { PageContainer } from './PageContainer'
import { reportError } from '../../services/errorReportingService'

export class ErrorBoundary extends Component {
  constructor(props){super(props);this.state={hasError:false,errorId:''}}
  static getDerivedStateFromError(){return{hasError:true,errorId:crypto.randomUUID?.()||Date.now().toString(36)}}
  componentDidCatch(error,errorInfo){reportError(error,{source:'react-boundary',componentStack:errorInfo.componentStack,errorId:this.state.errorId})}
  handleReload=()=>window.location.reload()
  render(){if(this.state.hasError)return <main id="main-content" className="grid min-h-screen place-items-center bg-donroom-background py-16"><PageContainer className="max-w-xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Application error</p><h1 className="mt-4 text-4xl font-bold tracking-tight">Something went wrong</h1><p className="mt-4 text-black/65">The page could not be displayed safely. Reload the application to try again.</p><p className="mt-3 text-xs text-subtle">Reference: {this.state.errorId}</p><button className="mt-8 rounded-full bg-donroom-primary px-6 py-3 font-semibold" onClick={this.handleReload} type="button">Reload application</button></PageContainer></main>;return this.props.children}
}
