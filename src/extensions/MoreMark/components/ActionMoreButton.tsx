import React, { useMemo } from 'react'

import {
  ActionButton,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  IconComponent,
  MenuDown,
} from '@/components'
import type { ButtonViewReturnComponentProps } from '@/types'
import { getShortcutKeys } from '@/utils/plateform'

export interface Item {
  title: string
  icon?: any
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}
interface IPropsActionMoreButton {
  editor: any
  disabled?: boolean
  color?: string
  maxHeight?: string | number
  icon?: any
  tooltip?: string
  items?: Item[]
}

function ActionMoreButton(props: IPropsActionMoreButton) {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive())
    if (find && !find.default) {
      return {
        ...find,
        icon: find?.icon ? find?.icon : props?.icon,
      }
    }
    const item: Item = {
      title: props.tooltip as any,
      icon: props.icon,
      isActive: () => false,
    }

    return item
  }, [props])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={props?.disabled} asChild>
        <ActionButton
          customClass="w-12"
          icon={props?.icon}
          tooltip={props?.tooltip}
          disabled={props?.disabled}
        >
          <MenuDown className="w-3 h-3 text-gray-500" />
        </ActionButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {props?.items?.map((item: any, index) => {
          return (
            <DropdownMenuCheckboxItem
              checked={active.title === item.title}
              onClick={item.action}
              key={index}
              className="flex items-center gap-3"
            >
              <IconComponent name={item?.icon} />
              <span className="ml-1">{item.title}</span>
              {!!item?.shortcutKeys && (
                <span className="ml-auto text-xs tracking-widest opacity-60">
                  {getShortcutKeys(item.shortcutKeys)}
                </span>
              )}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionMoreButton
